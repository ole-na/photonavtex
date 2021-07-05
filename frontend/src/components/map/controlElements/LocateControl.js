import React, {useEffect} from "react";
import {useMap} from "react-leaflet";
import L from "leaflet";
import iconBoat from "../icons/directions_boat_blue.svg";

import Locate from "leaflet.locatecontrol";
import "font-awesome/css/font-awesome.min.css";
import "../externalPlugins/locateControl/leaflet-locate.css";

export default function LocateControl() {
    const map = useMap();
    useEffect(() => {
        if (!map) return;

        const customIcon = {
            iconUrl: iconBoat,
            iconSize:     [50, 50],
            iconAnchor:   [24, 25],

        };

        L.control.locate({
            strings: {
                title: 'Locate me!'
            },
            markerClass: L.marker,
            markerStyle: {
                icon: L.icon( customIcon )
            }
        }).addTo(map);

    }, []);

   return null;
}
