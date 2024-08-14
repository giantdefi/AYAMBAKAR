import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { setShowMap,setUserCoords, setTotalDistance, setDuration, setShowGooglePopup } from 'redux/reducers/MapReducer'
import { useSelector, useDispatch } from 'react-redux'
//--------------------------------------

export default function BtnActivateBinary() {

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
  const { showMap, userCoords, showGooglePopup, totalDistance } = useSelector((state) => state.MapReducer)


    const handleLocation = () => {
        dispatch(setShowGooglePopup(true))
        // if (navigator.geolocation) {
        //   navigator.geolocation.getCurrentPosition((position) => {
        //     const { latitude, longitude, accuracy } = position.coords;
        //    // setUserCoords({ lat: latitude, lng: longitude });
        //  //  dispatch(setUserCoords({ lat: -6.2428683, lng: 107.0096988 })) // bekasi mede
        //    dispatch(setUserCoords({ lat: latitude, lng: longitude })) 
        //    setDistance(accuracy);
        //    dispatch(setShowMap(true)) 
        //    // setShowMap(true)
        //   });
        // }
      };


    return (
        <>
          
                <button onClick={handleLocation} className="w-full my-6 text-white bg-blue-700 hover:bg-blue-800 
                focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
                text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">  Hitung Biaya Pengiriman</button>
        
        </>
    )
}



