import React, {useEffect} from "react";
import {useMap} from "react-leaflet";
import L from "leaflet";
import "../externalPlugins/leaflet-ruler/leaflet-ruler.js";
import "../externalPlugins/leaflet-ruler/leaflet-ruler.css";

export default function NauticalRulerMeasureComponent() {
    const map = useMap();
    useEffect(() => {
        if (!map) return;

        const rulerMeasure = L.control.ruler({
            position: 'topleft'
        });
        rulerMeasure.addTo(map);
    }, []);

   return null;
}
