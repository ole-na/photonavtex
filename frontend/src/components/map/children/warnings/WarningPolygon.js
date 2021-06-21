import React from "react";
import {Polygon, Popup} from "react-leaflet";

export default function WarningPolygon({warning}) {
    console.log("WarningData:", warning);
    const colorOptions = { color: 'red' };
    const coords = warning.coords;

    return (coords &&
        <Polygon pathOptions={colorOptions} positions={coords}>
            <Popup>
                <h3>NavTex Polygon</h3>
            </Popup>
        </Polygon>
    );
}
