import React, {useEffect} from "react";
import {useMap} from "react-leaflet";
import Locate from "leaflet.locatecontrol";
import "font-awesome/css/font-awesome.min.css";
import "../../../css/leaflet-locate.css";
import iconBoat from "../icons/directions_boat_blue.svg";
import Leaflet from "leaflet";

export default function LocateControl() {
    const map = useMap();
    useEffect(() => {
        if (!map) return;

        const customIcon = {
            iconUrl: iconBoat,
            iconSize:     [50, 50],
            iconAnchor:   [24, 25],

        };

        Leaflet.control.locate({
            strings: {
                title: 'Locate me!'
            },
            markerClass: Leaflet.marker,
            markerStyle: {
                icon: Leaflet.icon( customIcon )
            }
        }).addTo(map);

    }, []);

   return null;
}
