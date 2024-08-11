import React, { useState, useRef} from "react";

import { InfoWindow, Marker} from "@react-google-maps/api";

//-------------------------
 const Markers = (props) => {
 
	
	const infoWindowRef = useRef(null);
	 
  const [ markers, setMarkers ] = useState(null)

  
  const onInfoWindowLoad = (e) => {	  
    infoWindowRef.current = e;
   setTimeout(() =>{
     if(props.clusterer) {
        infoWindowRef.current.close()
     }
     
   })
   
  }

//console.log(infoWindows)

 const onMarkerClick = (e) => { 

     if(infoWindowRef.current.anchor === null) {
      infoWindowRef.current.open(map, markers);
  }else{
      infoWindowRef.current.close() 
  }  
  }

  const onMarkerLoad = e => {
    setMarkers(e) // also bound infowindow to marker
    //infoWindowRef.current = e
  };

console.log(props.name)
  
const { clusterer, markerData, map, position } = props;

    return (
      <Marker
     //   clusterer={clusterer}
       onLoad={onMarkerLoad}
        position={position}
        onClick={(e) => onMarkerClick(e)}
	    	draggable={false}  
      >
        {markers &&  (
         
         <InfoWindow 
		      	marker={markers}
			      onLoad={onInfoWindowLoad}  
            hidden={true}
            
          >
            <div style={{ background: "white", fontWeight : "bold" }}>
              { markerData.name}
            </div>
          </InfoWindow>

        )}
      </Marker>
    );

}

export default Markers