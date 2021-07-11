import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { useState, useEffect } from 'react'

const _MapContainer = (props) => {

    const [position, setPosition] = useState({ lat: 45.46427, lng: 9.18951 })

    useEffect(() => {
        setPosition(props.pos)
    }, [])

    return (

        <div className="map-container container">
            <Map
                {...props}
                center={position || { lat: 45.46427, lng: 9.18951 }}
                initialCenter={position || { lat: 45.46427, lng: 9.18951 }}
                centerAroundCurrentLocation={false}
                containerStyle={{
                    height: '100vh',
                    position: 'relative',
                    width: '100%'
                }}>
                <Marker position={position || { lat: 45.46427, lng: 9.18951 }} />
            </Map>

        </div>
    );
}

export const GoogleMap = GoogleApiWrapper((props) => ({
    position: props.pos,
    apiKey: ('AIzaSyA1TpSPtsJIgXzeaeenK7R2XPSz5MzrSkk')
}))(_MapContainer)
{/* // AIzaSyAUSc1O5i0XVinJmXD7929Ux1jhjs2NzMw
//AIzaSyD-Sbj-DvVI1Rf0_mNW0BVF0_9EIzpsPUs
// AIzaSyALrFJBnFDGcCiP2nGHHWujEFLSpiABtAw
// AIzaSyC7SVSPj8l8YTwLoDGTEtzI4CII1V8-qF0 */}


