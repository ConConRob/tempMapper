import GoogleMapReact from 'google-map-react';
import { useEffect, useMemo, useState } from 'react';
import { fetchListings } from '../requests/listings';
import { coordinate, listing } from '../types/listing';
import { Dot } from './Dot';
import { DotWitchCard } from './DotWitchCard';

export function Map() {
  const defaultProps = {
    center: {
      lat: 43.65129,
      lng: -79.37161,
    },
    zoom: 11,
  };

  const [mapValues, setMapValues] = useState<GoogleMapReact.ChangeEventValue>();

  const [listings, setListings] = useState<{ [id: string]: listing }>({});

  useEffect(() => {
    if (mapValues) {
      fetchAndSetListings(mapValues?.bounds?.nw, mapValues?.bounds?.se);
    }
  }, [mapValues, mapValues?.bounds?.nw, mapValues?.bounds?.se]);

  async function fetchAndSetListings(
    nwCoordinate: coordinate,
    seCoordinate: coordinate
  ) {
    const listings = await fetchListings(nwCoordinate, seCoordinate);
    setListings((currentListings) => {
      listings.forEach((listing) => (currentListings[listing._id] = listing));
      return currentListings;
    });
  }

  const heatmapData = useMemo(() => {
    const positions: {
      lat: number;
      lng: number;
      weight?: number;
    }[] = Object.values(listings).map((listing) => ({
      lat: listing.lat,
      lng: listing.long,
      // weight:listing.totalViews
    }));

    return {
      positions: [
        { lat: 43.509319, lng: -79.674783, weight: 5130 },
        { lat: 43.509319, lng: -79.674783, weight: 9589 },
        { lat: 43.444101, lng: -79.669944, weight: 11475 },
        { lat: 43.4544816, lng: -79.6686557, weight: 12277 },
        { lat: 43.5076822, lng: -79.66747642, weight: 12493 },
        { lat: 43.4474108, lng: -79.6665485, weight: 7347 },
        { lat: 43.4474108, lng: -79.6665485, weight: 9768 },
        { lat: 43.605304, lng: -79.650811, weight: 5304 },
        { lat: 43.587571, lng: -79.645281, weight: 7453 },
        { lat: 43.575891, lng: -79.645196, weight: 6542 },
        { lat: 43.593042, lng: -79.642794, weight: 10828 },
        { lat: 43.593106, lng: -79.642247, weight: 13179 },
        { lat: 43.7012845, lng: -79.6389232, weight: 6334 },
        { lat: 43.7012845, lng: -79.6389232, weight: 14814 },
      ],
      options: {
        radius: 20,
        opacity: 0.6,
      },
    };
  }, [listings]);

  console.log(heatmapData);
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDFjZNErSWU6CC_hZ7P0OU-idfZqSMatWw' }}
        onChange={setMapValues}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        heatmapLibrary
        heatmap={heatmapData}
      >
        {Object.values(listings).map((listing) => (
          <DotWitchCard
            key={listing._id}
            lat={listing.lat}
            lng={listing.long}
            listing={listing}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
