import * as fs from 'fs';

import * as parse from 'csv-parse';
import * as path from 'path';
import { getDb } from '../../libs/getDb';
import { LISTING_COLLECTION_NAME } from '../../constants';
import { Listing } from '../../libs/listings';

// import async from 'async'
const FILE = 'seed.csv';
const FILE_PATH = path.join(__dirname, FILE);

if (require.main === module) {
  seed();
}

export async function seed() {
  const parser = fs.createReadStream(FILE_PATH).pipe(parse({ from_line: 2 }));
  const { db } = await getDb();
  await db
    .dropCollection(LISTING_COLLECTION_NAME)
    .catch((error) => console.log(error));

  await db.createCollection(LISTING_COLLECTION_NAME);
  const listingCollection = db.collection(LISTING_COLLECTION_NAME);
  listingCollection.createIndexes([
    {
      key: { lat: 1 },
      max: 90,
      min: -90,
    },
    {
      key: { long: 1 },
      max: 180,
      min: -180,
    },
  ]);
  let i = 0;
  // skip first row
  for await (const data of parser) {
    // row = [property, latitude, longitude, city, country, monthly_rate, lease_term_months, total_views]
    const numberIndexes = [1, 2, 5, 6, 7];
    numberIndexes.forEach((i) => (data[i] = parseFloat(data[i])));
    const row: [
      string,
      number,
      number,
      string,
      string,
      number,
      number,
      number
    ] = data;
    const listing = new Listing(...row);

    // could look at throwing to avoid bad data
    if (Number.isNaN(listing.monthlyRate)) console.log(listing);
    await listingCollection.insertOne(JSON.parse(JSON.stringify(listing)));
    console.log(`listings added: ${++i}`);
  }
}
