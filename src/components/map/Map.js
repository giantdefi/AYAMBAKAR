import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker, MarkerClusterer } from "@react-google-maps/api";
// Code sample ; https://codesandbox.io/s/h6vlq?file=/src/Map.js
// Remove function handleOnLoad prevemting google not defined

const mapOptions = {
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    gestureHandling: "greedy",
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [
          {
            visibility: "off"
          }
        ]
      }
    ]
  };

let markers = [
    {
      id: 1,
      position: {
      lat: -5.307031,
      lng: 105.310227 },
      name:"Julian"
    },
    {
      id: 2,
      position: {lat: -6.334408,
      lng: 106.783356 },
      name:"George"
    },
    {
      id: 3,
      position: { lat: -7.263543,
      lng: 112.729304 },
      name:"Amantha"
    },
    {
      id: 4,
      position: {lat: -1.137010,
      lng: 116.588760 },
      name:"Mark"
    }
  ];

function Map() {


  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    //const bounds = new google.maps.LatLngBounds();
    //markers.forEach(({ position }) => bounds.extend(position));
  //  map.fitBounds(bounds);
  };

  const defaultLocation = {
    lat: -1.384143,
    lng: 120.066324
  };

  return (
    <GoogleMap 

    center={defaultLocation}
    zoom={4}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: "100vw", height: "100vh" }}
      options={mapOptions}
    >
        {/* <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
    {clusterer => */}
      {markers.map(({ id, name, position }) => (
        <Marker
          key={id}
          position={position}
         // clusterer={clusterer}
          onClick={() => handleActiveMarker(id)}
        >
          {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>{name}</div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
          {/* } </MarkerClusterer> */}
    </GoogleMap>
  );
}

export default Map;
