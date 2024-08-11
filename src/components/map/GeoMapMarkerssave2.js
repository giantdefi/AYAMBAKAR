import React, { useState, useEffect} from "react";
//import { Link } from "react-router-dom";
//https://stackoverflow.com/questions/62888723/how-do-i-use-distance-matrix-api-in-reactjs-using-react-google-maps-api
// redux store --------------------------------------------------
import {connect} from 'react-redux';

//----------------------------------------------------------------
import { GoogleMap, LoadScript, MarkerClusterer, DistanceMatrixService, DirectionsService, DirectionsRenderer  } from "@react-google-maps/api";
import Markers from "./MarkersA";

const mapOptions = {
  fullscreenControl: false,
  streetViewControl: true,
  mapTypeControl: true,
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


export default function GoogleMapMarkers (props)  {

  const [storeCords, setStore] = useState({lat: -6.236578,lng: 106.9826});
  const [userCoords, setUserCoords] = useState({});
  const [distance, setDistance] = useState(0);
  const [zomm, setZoom] = useState(16);
  const [activeMarker, setActiveMarker] = useState(null);
  const [openMap, setOpenMAp] = useState(true);
  const [directions, setDirections] = useState(null);
  
  // center must use this and not individual const
  const [center, setCenter] = useState({ lat: -6.236529,lng: 106.982571})// this caused marker NOT move to center on clicked

  // DO NOT REMOVE for Comparation
  // const center = { // this caused marker move to center on clicked
  //   lat: -1.384143,
  //   lng: 120.066324
  // };


  console.log(userCoords)
  console.log(distance)


  useEffect(() => { // referal sponsor from URL if any
    handleLocation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => { // referal sponsor from URL if any
  if(userCoords) {
 
    // const data =  {
    //   id: 2,
    //   position: userCoords,
    //   name:"Lokasi anda"
    // }
    // myMarkers.push(data)
    //setZoom(15)
  }
   
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCoords])

 // const directionsService = new window.google.maps.DirectionsService();

  const handleLocation = () => {
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setUserCoords({ lat: latitude, lng: longitude });
        setDistance(accuracy);
        setOpenMAp(false)
        setTimeout(()=>{
           setOpenMAp(true)
        },100)
       
      });
    }

  //   directionsService.route(
  //     {
  //       origins: [{lat:-6.237510, lng:106.986846}],
  //        destinations: [{lat:-6.236578, lng:106.9826}],
  //      // destination: destination,
  //       travelMode: window.google.maps.TravelMode.DRIVING,
  //     },
  //     (result, status) => {
  //       if (status === window.google.maps.DirectionsStatus.OK) {
  //         setDirections(result);
  //       } else {
  //         console.error(`error fetching directions ${result}`);
  //       }
  //     }
  //   );
  // };



 // let myMarkers
 // const dataMarker = () => {
    let myMarkers = [
      {
        id: 1,
        position: storeCords,
        name:"Ayam Bakar"
      },
      {
        id: 2,
        position: userCoords && userCoords,
        name:"Lokasi anda"
      },
    
    ];
  //}

  console.log(myMarkers)

  


  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

return ( 
<>
{openMap &&
<LoadScript googleMapsApiKey="AIzaSyAkEmMjAYfctkEl7IdR-gofDFryxENzd8U" >
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
              center={center}
              zoom={zomm}
              onClick={() => setActiveMarker(null)}
             //  onLoad={onMapLoad}
              mapContainerStyle={{ flex: 1 }}
            >
              <MarkerClusterer >
                {clusterer =>
                  myMarkers.map(({ id, name, position }) => (
                    <Markers
                      key={id}
                      id={id}
                      name={name}
                      clusterer={clusterer}
                      position={position}
                      activeMarker={activeMarker}
                      handleActiveMarker={(id)=>handleActiveMarker(id)}
                      onClick={() => this.onClick()}
                    />
                  ))
                }
              </MarkerClusterer>
           
               <DistanceMatrixService
                options={{
                          destinations: [{lat:-6.236578, lng:106.9826}],
                          origins: [{lat:-6.237510, lng:106.986846}], //  origins: [{lat:-6.357150, lng:106.888750}], ciracas
                          travelMode: "DRIVING",
                        }}
                callback = {(response) => {console.log(response)}}
                />
                 {/* <DirectionsService
                  options={{
                    origin:  [{lat:-6.237510, lng:106.986846}], // New York City
                    destination: [{lat:-6.236578, lng:106.9826}], // Los Angeles
                    travelMode: "DRIVING",
                  }}
                  callback={(result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                      setDirections(result);
                    } else {
                      console.error(`error fetching directions ${result}`);
                    }
                  }}
        /> */}
   </GoogleMap>  
          </div>
        </div>
      </LoadScript>
}
</>
  );
}}
