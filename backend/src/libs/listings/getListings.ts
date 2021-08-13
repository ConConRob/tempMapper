import { getDb } from '../../libs/getDb';
import { LISTING_COLLECTION_NAME } from '../../constants';
import { Listing } from './Listing';

export type coordinate = { lat: number; long: number };

/**
 *  @description takes the top left and bottom right coordinates of a box and returns all listings in area
 *
 */
export async function getListings(
  nwCoordinate: coordinate,
  seCoordinate: coordinate
): Promise<Listing[]> {
  const { db } = await getDb();
  const listingCollection = db.collection<Listing>(LISTING_COLLECTION_NAME);

  const listings = await listingCollection
    .find({
      lat: { $gt: seCoordinate.lat, $lt: nwCoordinate.lat },
      long: { $gt: nwCoordinate.long, $lt: seCoordinate.long },
    })
    .toArray();

  return listings;
}
