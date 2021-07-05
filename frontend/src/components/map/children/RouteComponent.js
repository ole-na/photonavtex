import React from "react";
import {Polyline} from "react-leaflet";

// Dummy data: MongoDB data should be used
const routeCoords = [
    [54.083, 11.070],
    [54.099, 11.226],
    [54.109, 11.427],
    [54.162, 11.537],
    [54.233, 11.618],
    [54.291, 11.822],
    [54.306, 12.043],
    [54.342, 12.295],
    [54.455, 12.354],
    [54.455, 12.358],
    [54.455, 12.358],
];

const colorOptions = { color: 'lime', weight: 5 };

export default function RouteComponent() {
    return <Polyline pathOptions={colorOptions} positions={routeCoords} />
}
