import React from "react";
import {Polygon} from "react-leaflet";
import WarningPopup from "./WarningPopup";

export default function WarningPolygon(props) {
    const warning = props.warning;
    const colorOptions = { color: 'red' };

    return (warning.coords &&
        <Polygon pathOptions={colorOptions} positions={warning.coords}>
            <WarningPopup warning={warning} state={props.state} />
        </Polygon>
    )
}
