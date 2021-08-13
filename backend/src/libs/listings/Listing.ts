export class Listing {
  constructor(
    public label: string,
    public lat: number,
    public long: number,
    public city: string,
    public country: string,
    public monthlyRate: number,
    public leaseTermMonths: number,
    public totalViews: number
  ) {}
}
