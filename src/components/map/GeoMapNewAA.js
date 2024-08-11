import React, {Fragment, useRef, useState, useEffect} from "react";

// redux store --------------------------------------------------
import {connect} from 'react-redux';
import { setSidebarActive, storeUserGeo} from '../../redux';
//----------------------------------------------------------------



// https://www.npmjs.com/package/@react-google-maps/api
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

// when using Geocode
import Geocode from "react-geocode"; //https://www.npmjs.com/package/react-geocode
Geocode.setApiKey("AIzaSyAkEmMjAYfctkEl7IdR-gofDFryxENzd8U");
Geocode.setLanguage("en");
Geocode.setRegion("es");
Geocode.enableDebug();

const containerStyle = {
	width: '100%',
	minHeight: '500px'
  };

//=================================================
const GeoMapInput = (props) => {

	const mapRef        = useRef(null);
	const infoWindowRef = useRef(null);

	const [infoWindow, setInfowindow] = useState(false) // hidden true
	const [spinner, setHiddenSpinner] = useState(true) // hidden true
	const [zooms, setZooms] = useState(3)
	const [map, setMap] = useState(null)
	const [newMapCoordinate, SetNewMapCoordinate] = useState(null) // coordinate on map when drag
	const [marker, setMarkers] = useState(null) // infowindow to marker anchor
	const [dataLocation, setDataLocation] = useState({ // location change on marker drag
		country : '',
		city    : '',
		state   : '',
		address : '',
		zipcode : ''
	}) 

    const [userLocation, setUserLocation] = useState({ lat : 0, lng : 78 }) // center of map

	const defaulCenter = {
		lat:  userLocation.lat,
		lng:  userLocation.lng,
	};

	const [newCoordinate, setCoordinate] = useState(userLocation)
	const [searchInput, setSearchInput] = useState("")

	useEffect(()=>{
		if(props.userGeoID ) {
			setCoordinate({
				lat:  parseFloat(props.userGeoData.lt),
				lng:  parseFloat(props.userGeoData.lg)
			})
		
		}
	
	},[props.userGeoID])

	//console.log(newCoordinate)

	const onMarkerDragEnd = (data) => {		  console.log(data)
		const { latLng } = data;
		const lat = latLng.lat(); 
		const lng = latLng.lng();

		setInfowindow(true)	
	
		//setTimeout(()=>{
			const infoWInd = infoWindowRef.current
			infoWInd.open(map, marker);
		//},100)

		const mapMode = "not-centered" // option not for serach

		return handleGeocode(lat, lng, mapMode);
	}

	

	const onMapUnmount = React.useCallback(function callback(map) {
		setMap(null) // map unmounted
    }, [])
	
	const onMapLoad = React.useCallback(function callback(map) {
		
		mapRef.current = map;  // for control map
		
		// const bounds = new window.google.maps.LatLngBounds();
		// map.fitBounds(bounds);
	   //  setMap(map)
	}, [])

	


	const handleCenterChanged = () => {
		if (!mapRef.current) return;
		const data = mapRef.current.getCenter().toJSON()		
		SetNewMapCoordinate( data )
	}

	const onMarkerLoad = React.useCallback(function callback(data) {
		setMarkers(data)
	}, [])
	 
	const onMarkerClick = () => {	
		
		if(infoWindow){
			setInfowindow(false)
			const infoWInd = infoWindowRef.current
			    infoWInd.close(map, marker);	
		}else{
				setInfowindow(true)	
				const infoWInd = infoWindowRef.current
			    infoWInd.open(map, marker);
		}
	
	
			

		
	}
	


	const closeInfoWindow = () => { 		
		const infoWInd = infoWindowRef.current
		infoWInd.close();
	}

	const onInfoWindowLoad = data => { 
		infoWindowRef.current = data;	
		//console.log('data')
		//console.log(data)
	}

	

	const handleSaveGeo = () => {  
	//	props.modalHide()

		const data = {
			country : dataLocation.country,
			// city    : dataLocation.city,
			// state   : dataLocation.state,
			// address : dataLocation.address,
			// zipcode : dataLocation.zipcode,
			lat     : newCoordinate.lat,
			lng     : newCoordinate.lng,
		}

      // console.log(data)

       if(data.lat && data.lng && data.country) {
		props.storeUserGeo(
			data.lat,
			data.lng,
			data.country,
			props.userAccount)	 
	   }else{
		   alert('Please drag the Marker...')
	   }
	} 

	// ----- get location name by coordinate -----
	const handleGeocode = (lat, lng, mapMode) => {

	  let city    = "";
	  let states   = "";
	  let country = "";
	  let zipcode = "";
	  let address = "";

	  setHiddenSpinner(false) // hidden spinner
	  setDataLocation([])

	  Geocode.fromLatLng(lat, lng).then( response => {
		   
	  // response from geocode. Please console log to see all results. We will filter and select what we need only
	  const dataLocation = response.results[0].address_components;

	  let i;
	  for ( i = 0; i < dataLocation.length; i++) { // loop through the result

		  if (dataLocation[i].types[0] === "country") {
			  country =  dataLocation[i].long_name; 	
		  }
		  
		  if (dataLocation[i].types[0] === "administrative_area_level_1") {
			  states =  dataLocation[i].long_name;  		
		  }
		  
		  if (dataLocation[i].types[0] === "administrative_area_level_2") {
			  city =  dataLocation[i].long_name; 	
		  }	
		  
		  if (dataLocation[i].types[0] === "route") {
			  let addr =  dataLocation[i].long_name; 
		  
			  if(addr === 'Unnamed Road') { 
			  address = "";
			  }else{
			   address = addr;	
			  }
		  }
									  
		  if (dataLocation[i].types[0] === "postal_code") {
			  zipcode =  dataLocation[i].long_name;  
		  }	
		  
	  }// loop	
	  
	  setHiddenSpinner(true)

	if(!states) {
		
		closeInfoWindow()
		return
		
		//return alert('Invalid position. City name not found');   
	}

	setTimeout( () => {			  
				
		let coordinate = {
			lat     : lat,
			lng     : lng
		}
		let location = {
			address : address,
			city    : city,
			state   : states,
			country : country,
			zipcode : zipcode
		}

		setCoordinate(coordinate)	
		setDataLocation(location)
	   
		if(mapMode === 'centered') {  // centering map on search mode
		SetNewMapCoordinate(coordinate)
		}
			
	},100)
	 		  
	},
	error => {
	  return alert(error)
	}
  );   
}// grolocation end


 // ------- search form --------------
 const searchLocation = () => {
	
  const mapMode = "centered" // option not for serach

	Geocode.fromAddress(searchInput).then(
	  response => { 
		if(response.status === 'OK') {	
			const { lat, lng } = response.results[0].geometry.location;	
			setZooms(8)
			return handleGeocode(lat, lng, mapMode);	
		}
	  },
	  error => {
		 alert(error); 
	  }
	);
  }

  const handleChange = (e) => {
	const {value} = e.target	
	setSearchInput(value) 		 
}

//------ search end -----------------------

  return (
    <Fragment>

		<div className="form-group">
	
			<div className="input-group">
				<input type="text" className="form-control" placeholder="Enter city or address ..." style={{height: 46}}
				
				name="search"
				defaultValue={searchInput}
				onChange={handleChange}
				/>
				<span className="input-group-append">
					<button className="btn btn-info" type="button" onClick={searchLocation}><i className="fa fa-search"></i> Location Seach</button>
				</span>
			</div>
			</div>


 		<LoadScript googleMapsApiKey="AIzaSyAkEmMjAYfctkEl7IdR-gofDFryxENzd8U">

			<GoogleMap
			mapContainerStyle={containerStyle}
			center={ newMapCoordinate || defaulCenter}
			zoom={zooms}
			onLoad={onMapLoad}  //this error on bound the map. we not use it
			onUnmount={onMapUnmount}
			onDragEnd={handleCenterChanged}
			//dblClick={()=>alert()}
			>
			<Marker 
			onLoad={onMarkerLoad} 
			onClick={onMarkerClick}
			draggable={true}  
			position={ newCoordinate || defaulCenter} 
			onDragEnd = {(e) => onMarkerDragEnd(e)}
			//visible={false}
			>
			
			{infoWindow && 

			<InfoWindow 
			 marker={marker} // or  anchor={marker}
			 onLoad={onInfoWindowLoad}     
			 position={  newCoordinate || defaulCenter} 
			 hidden={true}

			style={{minWidth: 300}}>
				<div className="info-window-box"> 
				<div className="marker_address_box">
					<small>Country :  <strong><span> <i className="fa fa-warning text-danger" hidden={dataLocation.country}/> 
						{dataLocation.country}</span></strong> </small>
					<br/>
					<small>State :  <span> <i className="fa fa-warning text-danger" hidden={dataLocation.state}/> 
					{dataLocation.state}</span> </small>
					<br/>						
					<small>City :  <span> <i className="fa fa-warning text-danger" hidden={dataLocation.city}/> 
					{dataLocation.city}</span> </small>
					<br/>
					<small>Address :  <span> <i className="fa fa-warning text-danger" hidden={dataLocation.address}/> 
					{dataLocation.address}</span> </small>
					<br/>
					<small>Zipcode : {dataLocation.zipcode}</small>
					
					<hr className="my-1"/>
					
					<div className="text-center">
					<button className={!spinner? " btn-sm btn-info" : "btn-sm btn-primary"} onClick={()=>handleSaveGeo()} disabled={!spinner}>
						{/* <i className="fa fa-map-marker mr-1"></i>  */}
						<span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" hidden={spinner}></span>
						{!spinner? 'Searching....' : 'Save Location'}
					</button>
					</div>
					</div>  									
				</div>
		  </InfoWindow>
		}
			</Marker>

			
			
			</GoogleMap>
		</LoadScript>


	</Fragment>
  )
}

const mapStateToProps = (state) => ({

	EXPLORER : state.ExplorerReducer.EXPLORER,
	userAccount : state.MetamaskReducer.userAccount,

	spinner : state.TemplateReducer.spinner,

	userGeoID : state.GeoReducer.userGeoID,
	userGeoData : state.GeoReducer.userGeoData,
	
})

const actions = {
	setSidebarActive, storeUserGeo
}
export default connect( mapStateToProps, actions )(GeoMapInput)

