import React, {useEffect, useState} from "react";
import {Marker, Popup} from "react-leaflet";
import geolocationCurrentPosition from "../hooks/geolocationCurrentPosition";
import convertMetersPerSecondToKnots from "../hooks/geolocationConvertSpeed";
import MarkerIcon from "./icons/MarkerIcon";

export default function CurrentMarker() {
    const [state, setState] = useState({
        hasLocation: false,
        coords: [{
            lat: 54.291,
            long: 11.822,
        }],
        text: "Error: unable to determine location",
        url: "",
    });

    useEffect(() => {
        const currentPosition = geolocationCurrentPosition();
        if(currentPosition) {
            setState(currentPosition);
        }
    }, []);

    const currentMarker = state.hasLocation ? (
        <Marker position={state.coords} icon={MarkerIcon("current")}>
            <Popup>
                <h3>You are here</h3>
                <p>{state.text}</p>
                ({state.coords} && {state.coords.speed} &&
                    <p>
                        Speed: {convertMetersPerSecondToKnots(state.coords.speed)} nm
                    </p>
                )
            </Popup>
        </Marker>
    ) : null;

    return currentMarker;
}
