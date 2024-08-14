import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { setShowMap,setUserCoords, setTotalDistance, setDuration, setShowGooglePopup, setDeliveryCost, setUserLocation } from 'redux/reducers/MapReducer'
import { useSelector, useDispatch } from 'react-redux'
//=========================================================
const MapComponent = () => {

  //const router = useRouter()
  const dispatch = useDispatch()
  const [directions, setDirections] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [storeCords, setStore] = useState({lat: -6.236578,lng: 106.9826});
 // const [userCoords, setUserCoords] = useState(false);
  const [distance, setDistance] = useState(0);
  const [zomm, setZoom] = useState(16);
  const [activeMarker, setActiveMarker] = useState(null);
  //const [showMap, setShowMap] = useState(false);
  const { showMap, userCoords, showGooglePopup, basicCost, costperKM } = useSelector((state) => state.MapReducer)

  console.log(showGooglePopup)

  const mapStyles = {
    height: "40vh",
    width: "100%",
  
  };

  const options = {
    // streetViewControl: false,
    // mapTypeControl: false,
    // scrollwheel: true,
    mapTypeControl: false,
    draggable: true,
    scaleControl: false,
    scrollwheel: true,
    navigationControl: false,
    streetViewControl: false,
    panControl: false,
    disableDefaultUI: true,
   // mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  useEffect(() => { 
    if(showGooglePopup){
      handleLocation()
       dispatch(setShowGooglePopup(false))
    }
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showGooglePopup])

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude, accuracy } = position.coords;
       // setUserCoords({ lat: latitude, lng: longitude });
     //  dispatch(setUserCoords({ lat: -6.2428683, lng: 107.0096988 })) // bekasi mede
       dispatch(setUserCoords({ lat: latitude, lng: longitude })) 
       setDistance(accuracy);
       console.log(accuracy)
      
       dispatch(setShowMap(true)) 
       // setShowMap(true)
      });
    }
  };

  const defaultCenter = {
    lat: -6.357150,
    lng: 106.888750 , // warung
  };

  const destination = { lat:storeCords.lat, lng:storeCords.lng }; // warung
  const   origin = { lat:userCoords.lat, lng:userCoords.lng }; 
  console.log(destination)
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
          travelMode: window.google.maps.TravelMode.DRIVING, // TWO_WHEELER
        },
        (result, status) => {
          console.log(result)
          console.log(status)
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
            console.log(result.routes)
            console.log(result.routes[0].legs[0])
            console.log(result.routes[0].legs[0].start_address)
            dispatch(setUserLocation(result.routes[0].legs[0].start_address))
            console.log(result.routes[0].legs[0].end_address)
            console.log(result.routes[0].legs[0].duration.text)
            dispatch(setDuration(result.routes[0].legs[0].duration.text))
            console.log(result.routes[0].legs[0].distance.text)
            console.log(result.routes[0].legs[0].distance.value)
            const delprice = basicCost + (result.routes[0].legs[0].distance.value/1000 * costperKM)
            console.log(Math.ceil(delprice))
           dispatch(setDeliveryCost(Math.ceil(delprice)))
            // Calculate distance
            const route = result.routes[0];
            const totalDistance = route.legs.reduce((sum, leg) => sum + leg.distance.value, 0);
          console.log("totalDistance")
          console.log(totalDistance/1000 + '  KM')
          dispatch(setTotalDistance(totalDistance/1000))
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
        options={options}
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
