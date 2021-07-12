import React from "react";
import {Polygon} from "react-leaflet";
import WarningPopup from "./WarningPopup";

export default function WarningPolygon(props) {
    const warning = props.warning
    const warningPosition = warning.position;
    const colorOptions = { color: 'red' };

    return (warningPosition &&
        <Polygon pathOptions={colorOptions} positions={warningPosition}>
            <WarningPopup warning={warning} state={props.state} />
        </Polygon>
    )
}
