import React, { } from "react";

import { InfoWindow, Marker} from "@react-google-maps/api";

//-------------------------
 const Markers = (props) => {
 
const { clusterer, markerData, map, id, activeMarker, position, name } = props;

    return (
      <Marker
        clusterer={clusterer}
        position={position}
        onClick={() => props.handleActiveMarker(id)} // send to parent
	      draggable={false}  
      >        
         {activeMarker === id ? (   
         <InfoWindow >
            <div style={{ background: "white", fontWeight : "bold" }}>
              { name}
            </div>
          </InfoWindow>
 ) : null}
       
      </Marker>
    );

}

export default Markers