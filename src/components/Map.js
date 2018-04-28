import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap
} from "react-google-maps";

import { mapStyles } from './MapStyles.js';

import './Map.css';



export const Map = (props) => {
  //TODO: Calc center
  const center = { lat: 47.5, lng: -122.3 };

  return (
    <MapWrapper
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAM8gN5MryZGdX25YW3toAcaVVZqnS-hGw&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div className="loading" />}
      containerElement={<div className="map-container" />}
      mapElement={<div className="map" />}
      zoom={props.zoom}
      center={center}
      children={props.children}
    />
  )
};


const MapWrapper = withScriptjs(withGoogleMap(props => {
  return (
    <GoogleMap defaultZoom={props.zoom || 8} defaultCenter={props.center} options={{ styles: mapStyles.silver }} >
      {
        props.children
      }
    </GoogleMap>
  )
}));





// class Map extends Component {
//     render() {

//         const { dataPoints, markers } = this.props;

//         var map = new google.maps.Map(document.getElementById('map'), {
//             zoom: 9,
//             center: { lat: 47.5, lng: -122.3 }
//         });

//         styleSelector.addEventListener('change', function () {
//             map.setOptions({ styles: mapStyles.Silver });
//         });

//         for (var dp in dataPoints) {
//             // Add the circle for this city to the map.
//             var cityCircle = new google.maps.Circle({
//                 strokeWeight: 0,
//                 fillColor: '#C70039',
//                 fillOpacity: 1,
//                 map: map,
//                 center: dataPoints[dp].center,
//                 radius: dataPoints[dp].counts.reg * circleMultiplier
//             });

//             var cityCircle2 = new google.maps.Circle({
//                 strokeWeight: 0,
//                 fillColor: '#FF5733',
//                 fillOpacity: 1,
//                 map: map,
//                 center: dataPoints[dp].center,
//                 radius: dataPoints[dp].counts.occ * circleMultiplier
//             });

//             var cityCircle3 = new google.maps.Circle({
//                 strokeWeight: 0,
//                 fillColor: '#154360',
//                 fillOpacity: 1,
//                 map: map,
//                 center: dataPoints[dp].center,
//                 radius: dataPoints[dp].counts.rar * circleMultiplier
//             });
//         }

//         return (
//             <div class="map"></div>
//         );
//     }
// }


