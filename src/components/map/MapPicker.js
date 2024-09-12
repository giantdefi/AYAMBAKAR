import React, { useState } from 'react'

import MapPicker from 'react-google-map-picker'

const DefaultLocation = { lat: -6.236578, lng: 106.9826};
const DefaultZoom = 10;
import { setShowMap,setUserCoords, setTotalDistance,  setMapLoaded, } from 'redux/reducers/MapReducer'
import { setModalMapPicker } from 'redux/reducers/ModalReducer'
import { useSelector, useDispatch } from 'react-redux'
//-----------------------------------------------------
const App = () => {

    const dispatch = useDispatch()
 // const [storeCords, setStore] = useState({lat: -6.236578,lng: 106.9826});
 
  const { showMap } = useSelector((state) => state.MapReducer)
  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom); 
  const {  userCoords, totalDistance, userLocation } = useSelector((state) => state.MapReducer)
 const [defaultLocation, setDefaultLocation] = useState(userCoords);
 const [tempUserLocation, setTempUserLocation] = useState(false)

  
const handleChangeLocationBtn = () => {
   dispatch(setShowMap(true)) 
   dispatch(setModalMapPicker(false))
  // dispatch(setUserCoords(tempUserLocation)) 
}

  function handleChangeLocation (lat, lng){ 
  
    setLocation({lat:lat, lng:lng});
    setTempUserLocation({ lat: lat, lng: lng })
    dispatch(setUserCoords({ lat: lat, lng: lng })) 
   }
  
  function handleChangeZoom (newZoom){
    setZoom(newZoom);
  }


  const options = {
    // streetViewControl: false,
    // mapTypeControl: false,
    // scrollwheel: true,
    mapTypeControl: false,
  //  draggable: true,
    scaleControl: false,
    scrollwheel: true,
    navigationControl: false,
    streetViewControl: false,
    panControl: false,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  return (
    <>
 <section className="relative  bg-gray-200 dark:bg-gray-700 animated fadeIn ">

  {/* <button onClick={handleResetLocation}>Reset Location</button>
  <label>Latitute:</label><input type='text' value={location.lat} disabled/>
  <label>Longitute:</label><input type='text' value={location.lng} disabled/>
  <label>Zoom:</label><input type='text' value={zoom} />
   */}
  <MapPicker defaultLocation={defaultLocation}
    zoom={18}
    scrollwheel = {true}
    disableDefaultUI={false}
    navigationControl={false}
    mapTypeControl={false}
    mapTypeId="roadmap"
    style={{height:'500px'}}
    onChangeLocation={handleChangeLocation} 
    onChangeZoom={handleChangeZoom}
    apiKey='AIzaSyAkEmMjAYfctkEl7IdR-gofDFryxENzd8U'/>

   </section>
   <p className="text-white mt-4 text-sm">{userLocation}</p>

   <button onClick={handleChangeLocationBtn} className="w-full mt-4  text-white bg-orange-700 hover:bg-orange-800 
  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">  SIMPAN LOKASI</button>
  </> 
  );
}

export default App