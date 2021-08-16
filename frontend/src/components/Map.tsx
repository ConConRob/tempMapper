/* global google */

import GoogleMapReact from 'google-map-react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchListings } from '../requests/listings';
import { coordinate, listing } from '../types/listing';
import { DotWitchCard } from './DotWitchCard';
import { ListingCard } from './ListingCard';

const initLoadData = {
  center: {
    lat: 43.65129,
    lng: -79.37161,
  },
  zoom: 11,
};

export function Map() {
  function handleOnMapChange(data: GoogleMapReact.ChangeEventValue) {
    setMapValues(data);
  }

  const [mapValues, setMapValues] = useState<GoogleMapReact.ChangeEventValue>();

  const [listings, setListings] = useState<{ [id: string]: listing }>({});

  const [internalMap, setInternalMap] =
    useState<{ map: any; maps: any; ref: Element | null }>();

  const [heatMap, setHeatMap] = useState<any>(null);

  const [selectedListing, setSelectedListing] = useState<null | listing>(null);

  useEffect(() => {
    if (mapValues) {
      fetchAndSetListings(mapValues?.bounds?.nw, mapValues?.bounds?.se);
    }
  }, [
    mapValues,
    mapValues?.bounds?.nw,
    mapValues?.bounds?.se,
    internalMap,
    heatMap,
  ]);

  async function fetchAndSetListings(
    nwCoordinate: coordinate,
    seCoordinate: coordinate
  ) {
    if (!internalMap || !heatMap) {
      console.warn('map not loaded when trying to etch listings');
      return;
    }

    const listings = await fetchListings(nwCoordinate, seCoordinate);
    setListings((currentListings) => {
      currentListings = JSON.parse(JSON.stringify(currentListings));
      listings.forEach((listing) => {
        if (!currentListings[listing._id]) {
          heatMap.data.push({
            location: new internalMap.maps.LatLng(listing.lat, listing.long),
            weight: listing.totalViews, // listing.totalViews,
          });

          currentListings[listing._id] = listing;
        }
      });

      return currentListings;
    });

    heatMap.setMap(internalMap.map);
  }

  function onApiLoaded(maps: { map: any; maps: any; ref: Element | null }) {
    setInternalMap(maps);
    //@ts-ignore
    const googleGlobal = google;
    const heatMap = new googleGlobal.maps.visualization.HeatmapLayer({
      data: [],
      options: { dissipating: true, maxIntensity: 10000, radius: 10 },
    });
    setHeatMap(heatMap);
    heatMap.setMap(maps.map);
  }

  return (
    <StyledMap style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDFjZNErSWU6CC_hZ7P0OU-idfZqSMatWw' }}
        onChange={handleOnMapChange}
        defaultCenter={initLoadData.center}
        defaultZoom={initLoadData.zoom}
        heatmapLibrary
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={onApiLoaded}
      >
        {Object.values(listings).map((listing) => (
          <DotWitchCard
            key={listing._id}
            lat={listing.lat}
            lng={listing.long}
            listing={listing}
            selectListing={setSelectedListing}
            isSelected={selectedListing?._id === listing._id}
          />
        ))}
      </GoogleMapReact>

      {selectedListing ? (
        <div className='map-card-container'>
          <ListingCard listing={selectedListing} />
        </div>
      ) : null}
    </StyledMap>
  );
}

const StyledMap = styled.main`
  width: 100vw;
  height: 100vh;
  position: relative;

  .map-card-container {
    position: absolute;
    top: 20px;
    left: 20px;
  }
`;
