import { listing } from '../types/listing';

export function ListingCard({ listing }: { listing: listing }) {
  return (
    <div style={{ background: 'white', width: 150, zIndex: 10000 }}>
      <h3>{listing.label}</h3>
      <h4>
        {listing.city} {listing.country}
      </h4>
      <span> monthly rate{listing.monthlyRate}</span>
      <span> views{listing.totalViews}</span>
    </div>
  );
}
