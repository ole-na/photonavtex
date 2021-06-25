import React, {useEffect, useState} from 'react';
import "leaflet/dist/leaflet.css";
import {MapContainer, LayersControl} from 'react-leaflet';
import {NmScale} from "@marfle/react-leaflet-nmscale";

import TileLayerComponent from "./children/TileLayerComponent";
import WarningVectorLayers from "./children/warnings/WarningVectorLayers";
import RouteComponent from "./children/RouteComponent";
import LocateControl from './controlElements/LocateControl';
import {mapConfig} from "./mapConfig";
import MapSidebarComponent from "./mapSidebar/MapSidebarComponent";
import NauticalRulerMeasureComponent from "./controlElements/NauticalRulerMeasureComponent";

import "../../css/customLeaflet.css";

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
                <MapSidebarComponent />

                <LayersControl position="bottomright">
                    <TileLayerComponent />
                </LayersControl>

                <LocateControl />

                <NauticalRulerMeasureComponent />
                <NmScale />

                <WarningVectorLayers />
                <RouteComponent />
            </MapContainer>
        </div>
    )
}