import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
// const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox")
import { Component } from 'react'

class _MapContainer extends Component {
   


    state = {
        pos: {
            lat: 45.46427,
            lng: 9.18951
        }
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
    return (
        <div className="map-container">
            {/* <SearchBox/> */}
            <div className="btn-location-container">
                <button onClick={() => this.panMap('MILANO')}>Milano</button>
                <button onClick={() => this.panMap('TEL_AVIV')}>Tel Aviv</button>
                <button onClick={() => this.panMap('NEW_YORK')}>New York</button>
            </div>

            <Map google={this.props.google}
                zoom={10}
                initialCenter={{
                    lat: 45.46427,
                    lng: 9.18951
                }}
                center={this.state.pos}
                style={{
                    maxWidth: '550px',
                    height: '550px',
                    margin: '0 auto'
                }}
            >

                <Marker
                    position={this.state.pos}

                    name={'Branch location'} />
            </Map>
        </div>
    );
}
}

export const GoogleMap = GoogleApiWrapper({
    apiKey: ('AIzaSyD-Sbj-DvVI1Rf0_mNW0BVF0_9EIzpsPUs')
})(_MapContainer)
