import React from "react";
import {Polyline} from "react-leaflet";
import WarningPopup from "./WarningPopup";

export default function WarningLine(props) {
    const warning = props.warning
    const warningPosition = warning.position;
    const colorOptions = { color: 'red' };

    return(warningPosition &&
        <Polyline pathOptions={colorOptions} positions={warningPosition}>
            <WarningPopup warning={warning} state={props.state} />
        </Polyline>
    )
}