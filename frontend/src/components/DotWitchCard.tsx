import { useState } from 'react';
import { listing } from '../types/listing';
import { Dot } from './Dot';
import { ListingCard } from './ListingCard';

export function DotWitchCard({
  listing,
}: {
  listing: listing;
  lat: number;
  lng: number;
}) {
  const [active, setActive] = useState(false);
  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          setActive(!active);
        }}
      >
        <Dot />
      </button>
      {active ? <ListingCard listing={listing} /> : null}
    </div>
  );
}
