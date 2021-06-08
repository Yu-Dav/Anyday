import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { utilService } from '../../services/utilService';
import { userService } from '../../services/userService';
import { socketService } from '../../services/socketService';

class _CellLocation extends Component {

  state = {
    position: null,
    placeName: ''
  }

  componentDidMount() {
    console.log('did mount');
    this.renderAutoComplete();
  }
  // map = React.createRef()

  componentDidUpdate(prevProps) {
    console.log('did update');
    if (this.props !== prevProps.map) this.renderAutoComplete();
  }
  handleChange = () => {
    console.log('handle change');
    this.renderAutoComplete();
  }

  onChangeLoc = async(ev)=> {
    ev.preventDefault();
    const newLocation = {
      pos: this.state.position,
      name: this.state.placeName
    }
    this.props.task.location = newLocation
    const newBoard = { ...this.props.board }
    const newActivity = {
      id: utilService.makeId(),
      type: 'Location changed',
      createdAt: Date.now(),
      byMember: userService.getLoggedinUser(),
      task: {
          id: this.props.task.id,
          title: this.props.task.title,
          changedItem: newLocation.name
      },
      group: {
          id: this.props.group.id,
          title: this.props.group.title
      }
  }
  newBoard.activities.unshift(newActivity)
  await this.props.updateBoard(newBoard)
  await socketService.emit('board updated', newBoard._id);
  }

  renderAutoComplete() {
    const { google } = this.props;
    const map = this.map
    console.log(google, map);
    console.log(this.props);
    if (!google) return;

    const autocomplete = new google.maps.places.Autocomplete(this.autocomplete);
    // autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      if (!place.geometry) return;

      // if (place.geometry.viewport) map.fitBounds(place.geometry.viewport);
      // else {
      //     map.setCenter(place.geometry.location);
      //     map.setZoom(17);
      // }
      console.log(place);
      this.setState({ position: place.geometry.location, placeName: place.formatted_address }, console.log(this.state.position));
    });
  }


  render() {

    const { placeName } = this.state
    return (
      <div>
        <form onSubmit={this.onChangeLoc}>
          <input
            placeholder="Enter a location"
            ref={ref => (this.autocomplete = ref)}
            type="text"
            onChange={this.handleChange}
            value={placeName}
          />

          {/* <input type="submit" value="Go" /> */}
        </form>

      </div>
    )
  }
}

export const CellLocation = GoogleApiWrapper({
  // apiKey: ('AIzaSyALrFJBnFDGcCiP2nGHHWujEFLSpiABtAw')
  apiKey: ('AIzaSyA1TpSPtsJIgXzeaeenK7R2XPSz5MzrSkk')
})(_CellLocation)
























// import React from 'react';
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from 'react-places-autocomplete';

// export class LocationSearchInput extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = { address: '' };
//     }

//     handleChange = address => {
//       this.setState({ address });
//     };

//     handleSelect = address => {
//       geocodeByAddress(address)
//         .then(results => getLatLng(results[0]))
//         .then(latLng => console.log('Success', latLng))
//         .catch(error => console.error('Error', error));
//     };

//     render() {
//       return (
//         <PlacesAutocomplete
//           value={this.state.address}
//           onChange={this.handleChange}
//           onSelect={this.handleSelect}
//         >
//           {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//             <div>
//               <input
//                 {...getInputProps({
//                   placeholder: 'Search Places ...',
//                   className: 'location-search-input',
//                 })}
//               />
//               <div className="autocomplete-dropdown-container">
//                 {loading && <div>Loading...</div>}
//                 {suggestions.map(suggestion => {
//                   const className = suggestion.active
//                     ? 'suggestion-item--active'
//                     : 'suggestion-item';
//                   // inline style for demonstration purpose
//                   const style = suggestion.active
//                     ? { backgroundColor: '#fafafa', cursor: 'pointer' }
//                     : { backgroundColor: '#ffffff', cursor: 'pointer' };
//                   return (
//                     <div
//                       {...getSuggestionItemProps(suggestion, {
//                         className,
//                         style,
//                       })}
//                     >
//                       <span>{suggestion.description}</span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </PlacesAutocomplete>
//       );
//     }
//   }

// import {
//     withScriptjs,
//     withGoogleMap,
//     GoogleMap,
//     Marker,
//   } from 'react-google-maps';

// const _ = require("lodash");
// const { compose, withProps, lifecycle } = require("recompose");

// import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';

// const MapWithASearchBox = compose(
//   withProps({
//     googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ height: `100%` }} />,
//   }),
//   lifecycle({
//     componentWillMount() {
//       const refs = {}

//       this.setState({
//         bounds: null,
//         center: {
//           lat: 41.9, lng: -87.624
//         },
//         markers: [],
//         onMapMounted: ref => {
//           refs.map = ref;
//         },
//         onBoundsChanged: () => {
//           this.setState({
//             bounds: refs.map.getBounds(),
//             center: refs.map.getCenter(),
//           })
//         },
//         onSearchBoxMounted: ref => {
//           refs.searchBox = ref;
//         },
//         onPlacesChanged: () => {
//           const places = refs.searchBox.getPlaces();
//           const bounds = new google.maps.LatLngBounds();

//           places.forEach(place => {
//             if (place.geometry.viewport) {
//               bounds.union(place.geometry.viewport)
//             } else {
//               bounds.extend(place.geometry.location)
//             }
//           });
//           const nextMarkers = places.map(place => ({
//             position: place.geometry.location,
//           }));
//           const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

//           this.setState({
//             center: nextCenter,
//             markers: nextMarkers,
//           });
//           // refs.map.fitBounds(bounds);
//         },
//       })
//     },
//   }),
//   withScriptjs,
//   withGoogleMap
// )(props =>
//   <GoogleMap
//     ref={props.onMapMounted}
//     defaultZoom={15}
//     center={props.center}
//     onBoundsChanged={props.onBoundsChanged}
//   >
//     <SearchBox
//       ref={props.onSearchBoxMounted}
//       bounds={props.bounds}
//       controlPosition={google.maps.ControlPosition.TOP_LEFT}
//       onPlacesChanged={props.onPlacesChanged}
//     >
//       <input
//         type="text"
//         placeholder="Customized your placeholder"
//         style={{
//           boxSizing: `border-box`,
//           border: `1px solid transparent`,
//           width: `240px`,
//           height: `32px`,
//           marginTop: `27px`,
//           padding: `0 12px`,
//           borderRadius: `3px`,
//           boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
//           fontSize: `14px`,
//           outline: `none`,
//           textOverflow: `ellipses`,
//         }}
//       />
//     </SearchBox>
//     {props.markers.map((marker, index) =>
//       <Marker key={index} position={marker.position} />
//     )}
//   </GoogleMap>
// );

// <MapWithASearchBox />