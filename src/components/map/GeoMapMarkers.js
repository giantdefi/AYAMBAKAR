import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const MapComponent = () => {
  const [directions, setDirections] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [storeCords, setStore] = useState({lat: -6.236578,lng: 106.9826});
  const [userCoords, setUserCoords] = useState({});
  const [distance, setDistance] = useState(0);
  const [zomm, setZoom] = useState(16);
  const [activeMarker, setActiveMarker] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  useEffect(() => { // referal sponsor from URL if any
    handleLocation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setUserCoords({ lat: latitude, lng: longitude });
        setDistance(accuracy);
        setShowMap(true)
      });
    }
  };

  const defaultCenter = {
    lat: -6.357150,
    lng: 106.888750 , // warung
  };

  const destination = { lat:storeCords.lat, lng:storeCords.lng }; // sumarekon
  const   origin = { lat:userCoords.lat, lng:userCoords.lng }; 
  console.log(origin)
  const handleMapLoad = useCallback(() => {
    setMapLoaded(true);
  }, []);

  useEffect(() => {
    if (mapLoaded && window.google ) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin,
          destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          console.log(status)
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
            // Calculate distance
            const route = result.routes[0];
            const totalDistance = route.legs.reduce((sum, leg) => sum + leg.distance.value, 0);
          console.log("totalDistance")
          console.log(totalDistance/1000 + 'KM')
            //  setDistance(totalDistance / 1000); // Convert meters to kilometers
          } else {
            console.error(`Error fetching directions ${result}`);
          }
        }
      );
    }
  }, [mapLoaded, ]);

  return (
   
    <LoadScript googleMapsApiKey="AIzaSyAkEmMjAYfctkEl7IdR-gofDFryxENzd8U">
      {showMap &&
    <GoogleMap
        mapContainerStyle={mapStyles}
        center={storeCords}
        zoom={8}
        onLoad={handleMapLoad}
      >
        {directions && (
          <DirectionsRenderer directions={directions} />
        )}
      </GoogleMap>
       }
    </LoadScript>
     
  );
};

export default MapComponent;
