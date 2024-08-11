import React, { useEffect} from "react";
//import { Link } from "react-router-dom";

// redux store --------------------------------------------------
import {connect} from 'react-redux';
import { setSidebarActive, getUserGeo } from '../../redux';
//----------------------------------------------------------------

import GeoMapInput from './GeoMapInput';
import GeoMapMarkers from './GeoMapMarkers';

import Map from '../../assets/map.webp';

const Geolocation = (props) => {


useEffect(()=>{ 
//   window.scrollTo({
//    top: 0,
//    behavior: 'smooth',
//  })  
 props.setSidebarActive(10)
   // eslint-disable-next-line react-hooks/exhaustive-deps  
},[])

useEffect(()=>{
	
	if(props.EXPLORER && !props.userGeoID){
		props.getUserGeo(props.userAccount)
	}
	 // eslint-disable-next-line react-hooks/exhaustive-deps
},[props.EXPLORER])


//console.log(banner)

return ( 
<>
<div className="page-content" style={{minHeight: 400}}>
          <div className="container">
            <div className="row"> 

           <div className="col-12">
           
          
              <GeoMapMarkers /> 
           
             
            </div>
          
          


</div>
</div>
</div>
</>
  );
}


const mapStateToProps = (state) => ({

  EXPLORER : state.ExplorerReducer.EXPLORER,
	userAccount : state.MetamaskReducer.userAccount,
  userGeoID : state.GeoReducer.userGeoID,
	userGeoData : state.GeoReducer.userGeoData,
  isRegistered  : state.AuthReducer.isRegistered,
  })
  
  const actions = {
    setSidebarActive, getUserGeo
  }
  export default connect( mapStateToProps, actions )(Geolocation)
