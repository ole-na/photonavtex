import React from "react";
import {LayersControl, TileLayer} from "react-leaflet";
import {mapConfig} from "../mapConfig";
const { BaseLayer, Overlay } = LayersControl;

export default function TileLayerComponent() {
    return (<>
        {mapConfig.baseMaps.map(tileLayer =>
            tileLayer.display  &&
            <BaseLayer key={tileLayer.name} checked={tileLayer.checked} name={tileLayer.name}>
                <TileLayer opacity={tileLayer.opacity}
                           attribution={tileLayer.attribution}
                           url={tileLayer.urlTemplate} />
            </BaseLayer>
        )}
        {mapConfig.overlayMaps.map(tileLayer =>
            tileLayer.display &&
            <Overlay key={tileLayer.name} checked={tileLayer.checked} name={tileLayer.name}>
                <TileLayer opacity={tileLayer.opacity}
                           attribution={tileLayer.attribution}
                           url={tileLayer.urlTemplate} />
            </Overlay>
        )}
    </>)
}
