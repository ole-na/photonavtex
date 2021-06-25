import React, {useEffect, useState} from "react";
import {Marker, Popup} from "react-leaflet";
import MarkerIcon from "../icons/MarkerIcon";

export default function CurrentMarker() {
    const [state, setState] = useState({
        coords: [{
            lat: 54.291,
            long: 11.822,
        }],
    });

    useEffect(() => {
        // setState();
    }, []);

    return <Marker position={state.coords} icon={MarkerIcon("current")}>
            <Popup>
                <h3>New Warning</h3>
                <p>{state.text}</p>
                <p>
                    Coords: {state.coords}
                </p>
            </Popup>
        </Marker>
}
