import React from "react";
import GoogleMapReact from 'google-map-react';
import { GoogleMap, LoadScript, MarkerClusterer } from "@react-google-maps/api";
const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(){
  const defaultProps = {
    center: {
      lat: -6.236529,
      lng: 106.982571
    },
    zoom: 16
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAkEmMjAYfctkEl7IdR-gofDFryxENzd8U" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}