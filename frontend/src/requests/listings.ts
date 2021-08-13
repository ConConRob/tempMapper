import axios from 'axios';
import { coordinateToCoordinateString } from '../lib';
import { coordinate, listing } from '../types/listing';

export async function fetchListings(
  nwCoordinate: coordinate,
  seCoordinate: coordinate
) {
  const res = await axios.get<listing[]>('http://localhost:3000/dev/listings', {
    params: {
      nwCoordinate: coordinateToCoordinateString(nwCoordinate),
      seCoordinate: coordinateToCoordinateString(seCoordinate),
    },
  });

  return res.data;
}
