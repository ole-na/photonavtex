import React from "react";
import {CircleMarker, Marker} from "react-leaflet";
import MarkerIcon from "../../icons/MarkerIcon";
import WarningPopup from "./WarningPopup";

export default function WarningPoint(props) {
    const warning = props.warning
    const warningPosition = warning.position;

    return (warningPosition &&
        <CircleMarker center={warningPosition} opacity={0}>
            <Marker position={warningPosition} icon={MarkerIcon(props.state)}>
                <WarningPopup warning={warning} state={props.state} />
            </Marker>
        </CircleMarker>
    )
}