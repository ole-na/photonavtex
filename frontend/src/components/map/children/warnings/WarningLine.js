import React from "react";
import {Polyline} from "react-leaflet";
import WarningPopup from "./WarningPopup";

export default function WarningLine(props) {
    const warning = props.warning;
    const colorOptions = { color: 'red' };

    return(warning.coords &&
        <Polyline pathOptions={colorOptions} positions={warning.coords}>
            <WarningPopup warning={warning} state={props.state} />
        </Polyline>
    )
}