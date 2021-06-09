import React, { Component } from 'react';
// import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import Map, { Marker } from './MapReact';

import styles from './autocomplete.module.css';

class Contents extends Component {
  state = {
    position: null
  };

  componentDidMount() {
    this.renderAutoComplete();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps.map) this.renderAutoComplete();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  renderAutoComplete() {
    const { google, map } = this.props;

    if (!google || !map) return;

    const autocomplete = new google.maps.places.Autocomplete(this.autocomplete);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      if (!place.geometry) return;

      if (place.geometry.viewport) map.fitBounds(place.geometry.viewport);
      else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      this.setState({ position: place.geometry.location });
    });
  }

  render() {
    const { position } = this.state;

    return (
      <div className={styles.flexWrapper}>
        <div className={styles.left}>
          <form onSubmit={this.onSubmit}>
            <input
              placeholder="Enter a location"
              ref={ref => (this.autocomplete = ref)}
              type="text"
            />

            <input className={styles.button} type="submit" value="Go" />
          </form>

          <div>
            <div>Lat: {position && position.lat()}</div>
            <div>Lng: {position && position.lng()}</div>
          </div>
        </div>

        <div className={styles.right}>
          <Map
            {...this.props}
            center={position}
            centerAroundCurrentLocation={false}
            containerStyle={{
              height: '100vh',
              position: 'relative',
              width: '100%'
            }}>
            <Marker position={position} />
          </Map>
        </div>
      </div>
    );
  }
}

const MapWrapper = props => (
  <Map className="map" google={props.google} visible={false}>
    <Contents {...props} />
  </Map>
);

export default MapWrapper;

import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
// const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox")
import React, { Component } from 'react'

class _MapContainer extends Component {

    state = {
        // pos: {
        //     lat: 45.46427,
        //     lng: 9.18951
        // }
        position: null
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
    onSubmit(e) {
        e.preventDefault();
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

            this.setState({ position: place.geometry.location }, console.log(this.state.position));
        });
    }


    panMap = (loc) => {
        // console.log(loc)
        let pos = {};
        switch (loc) {
            case 'MILANO':
                pos.lat = 45.46427
                pos.lng = 9.18951
                break;
            case 'TEL_AVIV':
                pos.lat = 32.109333
                pos.lng = 34.855499
                break;
            case 'NEW_YORK':
                pos.lat = 40.730610
                pos.lng = -73.935242
                break;

        }
        this.setState({ pos })

    }
    // makeLoc = (loc, name = 'loc') => {
    //     return (loc = {
    //         id: storageService.getID(),
    //         name,
    //         loc,
    //         createdAt: Date.now(),
    //         updatedAt: "now",
    //         weather: "nice",
    //     });
    // }


    render() {
        const { position } = this.state;
        return (
            <div className="map-container container">
                {/* <SearchBox/> */}
                <div className="btn-location-container">
                    <button onClick={() => this.panMap('MILANO')}>Milano</button>
                    <button onClick={() => this.panMap('TEL_AVIV')}>Tel Aviv</button>
                    <button onClick={() => this.panMap('NEW_YORK')}>New York</button>
                </div>
                <form onSubmit={this.onSubmit}>
                    <input
                        placeholder="Enter a location"
                        ref={ref => (this.autocomplete = ref)}
                        type="text"
                        onChange={this.handleChange}
                    />

                    <input type="submit" value="Go" />
                </form>

                <div>
                    <div>Lat: {position && position.lat()}</div>
                    <div>Lng: {position && position.lng()}</div>
                </div>

                <Map
                    {...this.props}
                    center={position}
                    centerAroundCurrentLocation={false}
                    containerStyle={{
                        height: '100vh',
                        position: 'relative',
                        width: '100%'
                    }}>
                    <Marker position={position} />
                </Map>

                {/* <Map google={this.props.google}
                    zoom={10}
                    initialCenter={{
                        lat: 45.46427,
                        lng: 9.18951
                    }}
                    center={this.state.pos}
                    style={{
                        // position: 'absolute',
                        // bottom:'-214px',
                        maxWidth: '1903px',
                        height: '750px',
                        margin: '0 auto'
                    }}
                >

                    <Marker
                        position={this.state.pos}

                        name={'Branch location'} />
                </Map> */}
            </div>
        );
    }
}

export const GoogleMap = GoogleApiWrapper({
    // apiKey: ('AIzaSyALrFJBnFDGcCiP2nGHHWujEFLSpiABtAw')
})(_MapContainer)
// AIzaSyAUSc1O5i0XVinJmXD7929Ux1jhjs2NzMw
//AIzaSyD-Sbj-DvVI1Rf0_mNW0BVF0_9EIzpsPUs
// AIzaSyALrFJBnFDGcCiP2nGHHWujEFLSpiABtAw


// import React, { Component } from 'react';
// // import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
// import Map, { Marker } from './MapReact';

// import styles from './autocomplete.module.css';

// class Contents extends Component {
//   state = {
//     position: null
//   };

//   componentDidMount() {
//     this.renderAutoComplete();
//   }

//   componentDidUpdate(prevProps) {
//     if (this.props !== prevProps.map) this.renderAutoComplete();
//   }

//   onSubmit(e) {
//     e.preventDefault();
//   }

//   renderAutoComplete() {
//     const { google, map } = this.props;

//     if (!google || !map) return;

//     const autocomplete = new google.maps.places.Autocomplete(this.autocomplete);
//     autocomplete.bindTo('bounds', map);

//     autocomplete.addListener('place_changed', () => {
//       const place = autocomplete.getPlace();

//       if (!place.geometry) return;

//       if (place.geometry.viewport) map.fitBounds(place.geometry.viewport);
//       else {
//         map.setCenter(place.geometry.location);
//         map.setZoom(17);
//       }

//       this.setState({ position: place.geometry.location });
//     });
//   }

//   render() {
//     const { position } = this.state;

//     return (
//       <div className={styles.flexWrapper}>
//         <div className={styles.left}>
//           <form onSubmit={this.onSubmit}>
//             <input
//               placeholder="Enter a location"
//               ref={ref => (this.autocomplete = ref)}
//               type="text"
//             />

//             <input className={styles.button} type="submit" value="Go" />
//           </form>

//           <div>
//             <div>Lat: {position && position.lat()}</div>
//             <div>Lng: {position && position.lng()}</div>
//           </div>
//         </div>

//         <div className={styles.right}>
//           <Map
//             {...this.props}
//             center={position}
//             centerAroundCurrentLocation={false}
//             containerStyle={{
//               height: '100vh',
//               position: 'relative',
//               width: '100%'
//             }}>
//             <Marker position={position} />
//           </Map>
//         </div>
//       </div>
//     );
//   }
// }

// const MapWrapper = props => (
//   <Map className="map" google={props.google} visible={false}>
//     <Contents {...props} />
//   </Map>
// );

// export default MapWrapper;
{/* // import React, { Component } from 'react';
// // import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
// import Map, { Marker } from './MapReact';

// import styles from './autocomplete.module.css';

// class Contents extends Component { */}
//   state = {
//     position: null
//   };

//   componentDidMount() {
//     this.renderAutoComplete();
//   }

//   componentDidUpdate(prevProps) {
//     if (this.props !== prevProps.map) this.renderAutoComplete();
//   }

//   onSubmit(e) {
//     e.preventDefault();
//   }

//   renderAutoComplete() {
//     const { google, map } = this.props;

//     if (!google || !map) return;

//     const autocomplete = new google.maps.places.Autocomplete(this.autocomplete);
//     autocomplete.bindTo('bounds', map);

//     autocomplete.addListener('place_changed', () => {
//       const place = autocomplete.getPlace();

//       if (!place.geometry) return;

//       if (place.geometry.viewport) map.fitBounds(place.geometry.viewport);
//       else {
//         map.setCenter(place.geometry.location);
//         map.setZoom(17);
//       }

//       this.setState({ position: place.geometry.location });
//     });
//   }

//   render() {
//     const { position } = this.state;

//     return (
//       <div className={styles.flexWrapper}>
//         <div className={styles.left}>
//           <form onSubmit={this.onSubmit}>
//             <input
//               placeholder="Enter a location"
//               ref={ref => (this.autocomplete = ref)}
//               type="text"
//             />

//             <input className={styles.button} type="submit" value="Go" />
//           </form>

//           <div>
//             <div>Lat: {position && position.lat()}</div>
//             <div>Lng: {position && position.lng()}</div>
//           </div>
//         </div>

//         <div className={styles.right}>
//           <Map
//             {...this.props}
//             center={position}
//             centerAroundCurrentLocation={false}
//             containerStyle={{
//               height: '100vh',
//               position: 'relative',
//               width: '100%'
//             }}>
//             <Marker position={position} />
//           </Map>
//         </div>
//       </div>
//     );
//   }
// }

// const MapWrapper = props => (
//   <Map className="map" google={props.google} visible={false}>
//     <Contents {...props} />
//   </Map>
// );

// export default MapWrapper;



// <div className="map-container container">
// //     {/* <SearchBox/> */}
// //     <div className="btn-location-container">
// //         <button onClick={() => this.panMap('MILANO')}>Milano</button>
// //         <button onClick={() => this.panMap('TEL_AVIV')}>Tel Aviv</button>
// //         <button onClick={() => this.panMap('NEW_YORK')}>New York</button>
// //     </div>
// //     <form onSubmit={this.onSubmit}>
// //         <input
//             placeholder="Enter a location"
//             ref={ref => (this.autocomplete = ref)}
//             type="text"
//             onChange={this.handleChange}
//         />

//         <input type="submit" value="Go" />
//     </form>

    // <div>
    //     <div>Lat: {position && position.lat()}</div>
    //     <div>Lng: {position && position.lng()}</div>
    // </div>

//     <Map
//         {...this.props}
//         center={position}
//         centerAroundCurrentLocation={false}
//         containerStyle={{
//             height: '100vh',
//             position: 'relative',
//             width: '100%'
//         }}>
//         <Marker position={position} />
//     </Map>

//     /* <Map google={this.props.google}
//         zoom={10}
//         initialCenter={{
//             lat: 45.46427,
//             lng: 9.18951
//         }}
//         center={this.state.pos}
//         style={{
//             // position: 'absolute',
//             // bottom:'-214px',
//             maxWidth: '1903px',
//             height: '750px',
//             margin: '0 auto'
//         }}
//     >

//         <Marker
//             position={this.state.pos}

//             name={'Branch location'} />
//     </Map> */
// </div>
// );