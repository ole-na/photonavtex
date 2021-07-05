import React from "react";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";

import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import NewReleasesIcon from '@material-ui/icons/NewReleases';

export default function MarkerIcon(type) {
    const materialUiIcon = (type === "warning") ? <TrackChangesIcon /> : <NewReleasesIcon />;

    const customIcon = new L.divIcon({
        iconSize: [30, 42],
        iconAnchor: [15, 42],
        className: "custom-marker-icon",
        html: "<div style='background-color:red;' class='marker-pin'></div>" +
            ReactDOMServer.renderToString(materialUiIcon)
    });

    return customIcon;
}
