import { coordinate } from '../types/listing';

export function coordinateToCoordinateString(coordinate: coordinate) {
  return `${coordinate.lat},${coordinate.lng}`;
}

export function formatMoney(money: number) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(money);
}

export function formatNumber(number: number) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
  });

  return formatter.format(number);
}
