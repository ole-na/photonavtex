import React from "react";
import {LayersControl, TileLayer} from "react-leaflet";
import {mapConfig} from "../mapConfig";
import Divider from "@material-ui/core/Divider";
const { BaseLayer, Overlay } = LayersControl;

export default function TileLayerComponent() {

    //Init Layer Control
    /*
    * //Init Layer Control
var layerControl = L.control.layers(
  basemaps,
  overlays,
  {
    position: "topright",
    collapsed: false
  }
).addTo(map);

//Move Layers control to sidebar
var layerControlContainer = layerControl.getContainer();
$("#layercontrol").append(layerControlContainer);
$(".leaflet-control-layers-list").prepend("<strong className='title'>Base Maps</strong><br>");
$(".leaflet-control-layers-separator").after("<br><strong className='title'>Layers</strong><br>");
    *
    *
    *

    //Init Editable(Cosmetic) Layer for Leaflet Draw
    const editableLayers = new L.FeatureGroup().addTo(map);
    layerControl.addOverlay(editableLayers, "Cosmetic Layer"); */


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
