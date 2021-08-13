export type coordinate = { lat: number; lng: number };

export type listing = {
  _id: string;
  label: string;
  lat: number;
  long: number;
  city: string;
  country: string;
  monthlyRate: number;
  leaseTermMonths: number;
  totalViews: number;
};
