import { listing } from '../types/listing';
import { Dot } from './Dot';
import styled from 'styled-components';

export function DotWitchCard({
  listing,
  size = 15,
  isSelected,
  selectListing,
}: {
  listing: listing;
  lat: number;
  lng: number;
  size?: number;
  selectListing: (selection: listing | null) => void;
  isSelected: boolean;
}) {
  return (
    <div>
      <StyledDotWithCard size={size}>
        <button
          className='dot-button'
          onClick={(e) => {
            e.preventDefault();
            if (isSelected) {
              selectListing(null);
            } else {
              selectListing(listing);
            }
          }}
        >
          <Dot size={size} />
        </button>
      </StyledDotWithCard>
    </div>
  );
}

const StyledDotWithCard = styled.div<{ size: number }>`
  transform: translate(-50%, -50%);
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: flex;
  justify-content: center;
  align-items: center;
  .dot-button {
    background: none;
    border: none;
    padding: 0;
  }
`;
