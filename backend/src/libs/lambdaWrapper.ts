import {
  APIGatewayProxyEvent,
  APIGatewayProxyEventQueryStringParameters,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Callback,
  Context,
} from "aws-lambda";

export class HttpError {
  constructor(
    public status: number,
    public message?: string,
    public data?: any
  ) {
    if (!this.message) {
      // assign message based on code
      this.message = "Ahhhgg no general code messages";
    }
  }
}

export interface IHandlerWrapperOptions {}

type APIEventExtension = Omit<APIGatewayProxyEvent, "body"> & {
  body: unknown;
  queryStringParameters: APIGatewayProxyEventQueryStringParameters;
};

export function handlerWrapper(
  handler: (
    event: APIEventExtension,
    context: Context,
    callback: Callback<APIGatewayProxyResult>
  ) => Promise<{ body?: any; status?: number }>
  //   options?: IHandlerWrapperOptions
) {
  const f: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent,
    context,
    callback
  ) => {
    const newEvent: APIEventExtension = event;

    // clean up event
    event.headers = lowercaseKeys(event.headers);
    // add empty body if none
    if (!newEvent.body) {
      newEvent.body = JSON.parse(event.body);
    }
    if (!newEvent.queryStringParameters) {
      newEvent.queryStringParameters = {};
    }
    try {
      const { body, status } = await handler(newEvent, context, callback);

      return success(body, status, event);
    } catch (error) {
      if (error instanceof HttpError) {
        return failure(
          { message: error.message, data: error.data },
          error.status,
          event
        );
      }
      // log unexpected error for debugging
      console.error(error);
      return failure("internal server error", 500, event);
    }
  };
  return f;
}

function success(body: any, statusCode = 200, event: APIGatewayProxyEvent) {
  return buildResponse(statusCode, body, event);
}

function failure(body: any, statusCode = 500, event: APIGatewayProxyEvent) {
  return buildResponse(statusCode, body, event);
}
function buildResponse(statusCode: number, body: any, _: APIGatewayProxyEvent) {
  return {
    statusCode: statusCode,
    headers: {
      // @TODO add cors
      "Access-Control-Allow-Origin": "*",
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  };
}

function lowercaseKeys(obj: { [key: string]: string }) {
  return Object.keys(obj).reduce((acc: { [key: string]: string }, key) => {
    acc[key.toLowerCase()] = obj[key];
    return acc;
  }, {});
}
