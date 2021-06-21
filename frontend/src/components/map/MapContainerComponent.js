import React from 'react';
import "leaflet/dist/leaflet.css";
import {MapContainer} from 'react-leaflet';
import TileLayerComponent from "./children/TileLayerComponent";
import WarningVectorLayers from "./children/warnings/WarningVectorLayers";
import RouteComponent from "./children/RouteComponent";

export default function MapContainerComponent() {
    const mapProps = {
        center: [54.261, 11.474],
        zoom: 10
    }

    const styles = {targetDiv: { height: 'calc(100vh - 250px)'}}

    return (
        <figure id="map">
            <MapContainer center={mapProps.center} zoom={mapProps.zoom} scrollWheelZoom={false} style={styles.targetDiv}>
                <TileLayerComponent type="openStreetMap" />
                <TileLayerComponent type="openSeaMap" />
                <WarningVectorLayers />
                <RouteComponent />
            </MapContainer>
        </figure>
    );
}