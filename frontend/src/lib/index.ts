import { coordinate } from '../types/listing';

export function coordinateToCoordinateString(coordinate: coordinate) {
  return `${coordinate.lat},${coordinate.lng}`;
}
