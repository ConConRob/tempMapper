import axios from 'axios';
import { coordinateToCoordinateString } from '../lib';
import { coordinate, listing } from '../types/listing';

const API_BASE =
  process.env.NODE_ENV === 'production'
    ? 'https://mapper.api.connorrob.com'
    : 'http://localhost:3000/dev';

const requester = axios.create({ baseURL: API_BASE });

export async function fetchListings(
  nwCoordinate: coordinate,
  seCoordinate: coordinate
) {
  const res = await requester.get<listing[]>('/listings', {
    params: {
      nwCoordinate: coordinateToCoordinateString(nwCoordinate),
      seCoordinate: coordinateToCoordinateString(seCoordinate),
    },
  });

  return res.data;
}
