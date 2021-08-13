import { MongoClient, Db } from 'mongodb';
import { DB_NAME, DB_URI } from '../constants';

// CHECK FOR REQUIRED ENV VARS
if (!DB_URI) {
  throw new Error(
    'The MONGODB_URI environment variable must be configured with the connection string ' +
      'to the database.'
  );
}

if (!DB_NAME) {
  throw new Error(
    'The DB_NAME environment variable must be configured with the connection string ' +
      'to the database table.'
  );
}

// Cached connection promise
let cachedDb: Db | null = null;
let cachedClient: MongoClient | null = null;
// Function for connecting to MongoDB, returning a new or cached database connection
export async function getDb(): Promise<{ db: Db; client: MongoClient }> {
  if (cachedClient && cachedClient.isConnected()) {
    return { db: cachedDb, client: cachedClient };
  }
  return MongoClient.connect(DB_URI, { useUnifiedTopology: true }).then(
    (client) => {
      cachedDb = client.db(DB_NAME);
      cachedClient = client;
      return { db: cachedDb, client: cachedClient };
    }
  );
}

export async function disconnectFromDatabase(): Promise<void> {
  if (cachedClient && cachedClient.isConnected()) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
    return;
  }
}
