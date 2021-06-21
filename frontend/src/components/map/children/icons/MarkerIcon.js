import React from "react";
import Leaflet from "leaflet";
import ReactDOMServer from "react-dom/server";

import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';

export default function MarkerIcon(type) {
    const materialUiIcon = (type === "warning") ? <TrackChangesIcon /> : <DirectionsBoatIcon />;

    const customIcon = new Leaflet.divIcon({
        iconSize: [30, 42],
        iconAnchor: [15, 42],
        className: "custom-marker-icon",
        html: "<div style='background-color:red;' class='marker-pin'></div>" +
            ReactDOMServer.renderToString(<TrackChangesIcon />)
    });

    return customIcon;
}
