import { getListings } from '../libs/listings';
import { handlerWrapper, HttpError, parseCoordinateString } from '../libs';

export const handler = handlerWrapper(async (event) => {
  const { nwCoordinate: nwCoordinateString, seCoordinate: seCoordinateString } =
    event.queryStringParameters;
  if (!nwCoordinateString || !seCoordinateString)
    throw new HttpError(400, 'both coordinates are required');

  const nwCoordinate = parseCoordinateString(nwCoordinateString);
  const seCoordinate = parseCoordinateString(seCoordinateString);
  if (!nwCoordinate || !seCoordinate)
    throw new HttpError(400, 'format for coordinate is "40,50"');

  const listings = await getListings(nwCoordinate, seCoordinate);

  return { body: listings, status: 200 };
});
