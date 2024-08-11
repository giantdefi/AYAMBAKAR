
import React from "react";

import { GoogleMap, LoadScript, MarkerClusterer } from "@react-google-maps/api";

import Markers from "./Markers";

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
const key = "AIzaSyAkEmMjAYfctkEl7IdR-gofDFryxENzd8U"; // PUT GMAP API KEY HERE
const defaultLocation = {
  lat: -1.384143,
  lng: 120.066324
};
let markers = [
  {
    id: 1,
    lat: -5.307031,
    lng: 105.310227
  },
  {
    id: 2,
    lat: -6.334408,
    lng: 106.783356
  },
  {
    id: 3,
    lat: -7.263543,
    lng: 112.729304
  },
  {
    id: 4,
    lat: -1.137010,
    lng: 116.588760
  }
];

export default class extends React.Component {
 
  state = {
    isInfoOpen: false,
    selectedMarkerId: null,
 //   noOfClusters: null,
    markers: markers
  };

  onClick = (isInfoOpen, selectedMarkerId) => {
    this.setState({
      isInfoOpen,
      selectedMarkerId
    });
  };

  render() {
    const { isInfoOpen, selectedMarkerId } = this.state;

    return (
      <LoadScript googleMapsApiKey={key} >
        <div>
          <div
            style={{
              width: "100%",
              height: 500,
              display: "flex"
            }}
          >
            <GoogleMap
              options={mapOptions}
              center={defaultLocation}
              zoom={4}
             // onLoad={this.onMapMounted}
            //  onIdle={this.onMapIdle}
              onBoundsChanged={this.onBoundsChanged}
              onZoomChanged={this.onZoomChanged}
              mapContainerStyle={{ flex: 1 }}
            >
              <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
                {clusterer =>
                  this.state.markers.map(markerData => (
                    <Markers
                      key={markerData.id}
                      clusterer={clusterer}
                      markerData={markerData}
                      isSelected={markerData.id === selectedMarkerId}
                      isInfoOpen={
                        markerData.id === selectedMarkerId && isInfoOpen
                      }
                      onClick={() => this.onClick()}
                    />
                  ))
                }
              </MarkerClusterer>
            </GoogleMap>  
          </div>
        </div>
      </LoadScript>
    );
  }
}
