import React, {useEffect, useState} from 'react';
import "leaflet/dist/leaflet.css";
import {MapContainer, LayersControl, TileLayer, useMap} from 'react-leaflet';
import {NmScale} from "@marfle/react-leaflet-nmscale";

import TileLayerComponent from "./children/TileLayerComponent";
import WarningVectorLayers from "./children/warnings/WarningVectorLayers";
import RouteComponent from "./children/RouteComponent";
import Legend from "./Legend";
import LocateControl from './LocateControl';
import {mapConfig} from "./mapConfig";

export default function  MapContainerComponent() {
    const [map, setMap] = useState(null);
    const mapOptions = mapConfig.options;
    const styles = {targetDiv: { height: 'calc(100vh - 250px)'}}

    return (
        <div id="map">
            <MapContainer center={mapOptions.center}
                          zoom={mapOptions.zoom}
                          scrollWheelZoom={mapOptions.scrollWheelZoom}
                          style={styles.targetDiv} fadeAnimation={true}
                          markerZoomAnimation={true}
                          whenCreated={map => setMap(map)}
            >

                <LayersControl position="topright">
                    <TileLayerComponent />
                </LayersControl>

                <LocateControl />
                <Legend map={map} />
                <NmScale />

                <WarningVectorLayers />
                <RouteComponent />
            </MapContainer>
        </div>
    )
}