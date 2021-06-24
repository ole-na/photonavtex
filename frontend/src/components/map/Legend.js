import { useEffect } from 'react';
import Leaflet from 'leaflet';

export default function Legend({map}) {
    useEffect(() => {
        if (map) {
            const legend = Leaflet.control({ position: "bottomright" });

            legend.onAdd = () => {
                const div = Leaflet.DomUtil.create("div", "map-legend");
                div.innerHTML =
                    "<p><i class='route'></i> Route</p>" +
                    "<p><i class='warning'></i> NAVTEX</p>" +
                    "<p><i class='current-position'></i> Current position</p>";
                return div;
            };

            legend.addTo(map);
        }
    }, [map]);
    return null;
}
