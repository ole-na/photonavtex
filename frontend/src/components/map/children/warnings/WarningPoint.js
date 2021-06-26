import React from "react";
import {CircleMarker, Marker} from "react-leaflet";
import MarkerIcon from "../../icons/MarkerIcon";
import WarningPopup from "./WarningPopup";

export default function WarningPoint(props) {
    const warning = props.warning;

    return (warning.coords &&
        <CircleMarker center={warning.coords} opacity={0}>
            <Marker position={warning.coords} icon={MarkerIcon(props.state)}>
                <WarningPopup warning={warning} state={props.state} />
            </Marker>
        </CircleMarker>
    )
}