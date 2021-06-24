import React, {useEffect, useState} from "react";
import {CircleMarker, Marker, Popup} from "react-leaflet";
import geolocationDistance from "../../hooks/geolocationDistance";
import geolocationCurrentPosition from "../../hooks/geolocationCurrentPosition";
import MarkerIcon from "../../icons/MarkerIcon";

export default function WarningCircle({warning}) {

    const [currentState, setCurrentState] = useState({
        hasLocation: false,
        coords: [],
        text: "Error",
        url: ""
    });

    useEffect(() => {
        const currentPosition = geolocationCurrentPosition();
        if(currentPosition) {
            setCurrentState(currentPosition);
        }
    }, [])

    const distance = (currentState && currentState.hasLocation && currentState.coords && currentState.coords.speed) ? (
        <p>
            Distance from current position: {
                geolocationDistance(
                    warning.lat,
                    warning.long,
                    currentState.coords.latitude,
                    currentState.coords.longitude
                )
            } nm
        </p>
    ) : null;

    return(
        (warning.coords &&
            <CircleMarker center={{lat: warning.coords[0], lng: warning.coords[1]}} opacity={0}>
                <Marker position={warning.coords} icon={MarkerIcon("warning")}>
                    <Popup>
                        <h3>NavTex Marker</h3>
                        <p>Position: {warning.lat}, {warning.long}</p>
                        {distance}
                    </Popup>
                </Marker>
            </CircleMarker>
        )
    );
}