import React, {useEffect} from "react";
import {useMap} from "react-leaflet";
import Locate from "leaflet.locatecontrol";
import "font-awesome/css/font-awesome.min.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";

export default function LocateControl() {
    const map = useMap();
    useEffect(() => {
        const lc = new Locate({
                position: 'topleft',
                strings: {
                    title: 'Find me!'
                },
                onActivate: () => {}
        });
        lc.addTo(map);
    }, []);

   return null;
}
