import React from "react";
import "leaflet/dist/leaflet.css";
import Leaflet from "leaflet";
import {TileLayer} from "react-leaflet";

// TODO: refactor this component: define an object for all TileLayers
const openStreetMap_DE = Leaflet.tileLayer(
    'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
    {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
);

// TODO: <TileLayer> should be moved to a new component TileLayer
export default function TileLayerComponent({type}) {
    const opacity = '0.8';
    switch (type) {
        case 'openStreetMap':
            return <TileLayer opacity={opacity}
                              attribution='Map data &copy; <a href="http://osm.org/copyright" rel="noOpener">OpenStreetMap</a> contributors'
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />;
        case 'openStreetMapDE':
            return openStreetMap_DE;
        case 'openSeaMap':
            return <TileLayer opacity={opacity}
                              attribution='&copy; <a href="http://www.openseamap.org">OpenSeaMap</a> contributors'
                              url="https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png"
            />;
        default:
            return null;
    }
}
