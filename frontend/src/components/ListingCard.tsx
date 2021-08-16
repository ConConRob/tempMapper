import styled from 'styled-components';
import { formatMoney, formatNumber } from '../lib';
import { listing } from '../types/listing';

export function ListingCard({ listing }: { listing: listing }) {
  return (
    <StyledListingCard>
      <h3>{listing.label}</h3>
      <h4>
        {listing.city} , {listing.country}
      </h4>
      <p> Monthly Rate: {formatMoney(listing.monthlyRate)}</p>
      <p> Views: {formatNumber(listing.totalViews)}</p>
    </StyledListingCard>
  );
}

const StyledListingCard = styled.div`
  padding: 20px;
  background: #ffffff;
  width: 200px;
  z-index: 5;
  span {
    margin-bottom: 10px;
  }
`;
