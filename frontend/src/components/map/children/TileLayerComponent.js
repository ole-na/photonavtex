import React from "react";
import {LayersControl, TileLayer} from "react-leaflet";
import {mapConfig} from "../mapConfig";
import Divider from "@material-ui/core/Divider";
const { BaseLayer, Overlay } = LayersControl;

export default function TileLayerComponent() {
    return (<>
        <LayersControl position="topleft">
            <h3>Base Maps</h3>
            {mapConfig.baseMaps.map(tileLayer =>
                tileLayer.display  &&
                <BaseLayer key={tileLayer.name} checked={tileLayer.checked} name={tileLayer.name}>
                    <TileLayer opacity={tileLayer.opacity}
                               attribution={tileLayer.attribution}
                               url={tileLayer.urlTemplate} />
                </BaseLayer>
            )}

            <Divider />

            <h3>Overlays</h3>
            {mapConfig.overlayMaps.map(tileLayer =>
                tileLayer.display &&
                <Overlay key={tileLayer.name} checked={tileLayer.checked} name={tileLayer.name}>
                    <TileLayer opacity={tileLayer.opacity}
                               attribution={tileLayer.attribution}
                               url={tileLayer.urlTemplate} />
                </Overlay>
            )}
        </LayersControl>
    </>)
}
