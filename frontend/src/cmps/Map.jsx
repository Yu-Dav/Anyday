import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
// const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox")
import React, { Component } from 'react'

class _MapContainer extends Component {

    state = {
        position: null
    }
    componentDidMount() {
        console.log('did mount');
        this.setState({ position: this.props.pos }, console.log(this.state))
    }


    render() {
        let { position } = this.state;
        if (!position) position= {lat: 45.46427,lng: 9.18951}
        return (

            <div className="map-container container">
                <Map
                    {...this.props}
                    center={position}
                    initialCenter={position}
                    centerAroundCurrentLocation={false}
                    containerStyle={{
                        height: '100vh',
                        position: 'relative',
                        width: '100%'
                    }}>
                    <Marker position={position} />
                </Map>

            </div>
        );
    }
}

export const GoogleMap = GoogleApiWrapper((props) => ({
    position: props.pos,
    apiKey: ('AIzaSyA1TpSPtsJIgXzeaeenK7R2XPSz5MzrSkk')
}))(_MapContainer)
{/* // AIzaSyAUSc1O5i0XVinJmXD7929Ux1jhjs2NzMw
//AIzaSyD-Sbj-DvVI1Rf0_mNW0BVF0_9EIzpsPUs
// AIzaSyALrFJBnFDGcCiP2nGHHWujEFLSpiABtAw
// AIzaSyC7SVSPj8l8YTwLoDGTEtzI4CII1V8-qF0 */}


