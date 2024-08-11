import React, { useState, useEffect} from "react";
//import { Link } from "react-router-dom";

// redux store --------------------------------------------------
import {connect} from 'react-redux';

//----------------------------------------------------------------
import { GoogleMap, LoadScript, MarkerClusterer, DistanceMatrixService  } from "@react-google-maps/api";
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

{/* <DistanceMatrixService
 options={{
           destinations: [{lat:1.296788, lng:103.778961}],
           origins: [{lng:103.780267, lat:1.291692}],
           travelMode: "DRIVING",
         }}
 callback = {(response) => {console.log(response)}}
/> */}

//var service = new window.google.map.DistanceMatrixService()

const GoogleMapMarkers = (props) => {

  const [storeCords, setStore] = useState({lat: -6.236578,lng: 106.9826});
  const [userCoords, setUserCoords] = useState({});
  const [distance, setDistance] = useState(0);
  const [zomm, setZoom] = useState(16);
  const [activeMarker, setActiveMarker] = useState(null);
  
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

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setUserCoords({ lat: latitude, lng: longitude });
        setDistance(accuracy);
      });
    }
  };



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
      // {
      //   id: 3,
      //   position: { lat: -7.263543,
      //   lng: 112.729304 },
      //   name:"Amantha"
      // },
      // {
      //   id: 4,
      //   position: {lat: -1.137010,
      //   lng: 116.588760 },
      //   name:"Mark"
      // }
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
              {/* <DistanceMatrixService
            options={{
              destinations: ["-6.237324011050663","106.98655922577355"], //userCoords?userCoords : storeCords,
              origins: ["-6.236578","106.9826"],
              travelMode: "DRIVING",
            }}
            callback={(res) => {
              console.log("RESPONSE", res);
             
            }}
          /> */}
         <DistanceMatrixService
            options={{
              destinations: [{ lat: -6.236578, lng:106.9826 }],
              origins: [{ lng: -6.237368194046766, lat: 106.9867216479957 }],
              travelMode: "DRIVING",
            }}
            callback={(res) => {
              console.log("RESPONSE", res);
             
            }}
          />
            </GoogleMap>  
          </div>
        </div>
      </LoadScript>
</>
  );
}


const mapStateToProps = (state) => ({

  // EXPLORER : state.ExplorerReducer.EXPLORER,
	// userAccount : state.MetamaskReducer.userAccount,
  // userGeoID : state.GeoReducer.userGeoID,
	// userGeoData : state.GeoReducer.userGeoData,
  // isRegistered  : state.AuthReducer.isRegistered,
  })
  
  const actions = {
    //setSidebarActive, getUserGeo
  }
  export default connect( mapStateToProps, actions )(GoogleMapMarkers)
