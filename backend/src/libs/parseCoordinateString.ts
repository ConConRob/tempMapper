import { coordinate } from './listings';

export function parseCoordinateString(
  coordinateString: string
): coordinate | undefined {
  const [latString, longString] = coordinateString.split(',');
  const long = parseFloat(longString);
  const lat = parseFloat(latString);
  if (Number.isNaN(long) || Number.isNaN(lat)) {
    return;
  }
  return { lat, long };
}
