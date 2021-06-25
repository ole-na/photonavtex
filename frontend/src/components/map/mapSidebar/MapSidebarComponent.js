import React, { useEffect } from 'react';
import L from 'leaflet';
import {useMap} from "react-leaflet";

import Sidebar from 'leaflet-sidebar-v2';
import "leaflet-sidebar-v2/css/leaflet-sidebar.css";

import SidebarInfo from "./sidebarContent/SidebarInfo";
import SidebarLayers from "./sidebarContent/SidebarLayers";
import SidebarSettings from "./sidebarContent/SidebarSettings";

export default function MapSidebarComponent() {
    const map = useMap();
    useEffect(() => {
        if (map) {
            L.control.sidebar = function (id, options) {
                return new L.Control.Sidebar(id, options);
            };
            const sidebar = L.control.sidebar('mapSidebar', {
                autopan: false, // whether to maintain the centered map point when opening the sidebar
                closeButton: true,
                container: 'mapSidebar',
                position: 'right',
                fullscreenElement: true
            });
            sidebar.addTo(map);
        }
    }, []);

    return (
        <div id="mapSidebar" class="leaflet-sidebar collapsed">
            <div className="leaflet-sidebar-tabs">
                <ul role="tablist">
                    <li><a href="#mapSidebarLayers" role="tab"><i className="fa fa-map"></i></a></li>
                    <li><a href="#mapSidebarInfo" role="tab"><i className="fa fa-info"></i></a></li>
                </ul>

                <ul role="tablist">
                    <li><a href="#mapSidebarSettings" role="tab"><i className="fa fa-gear"></i></a></li>
                </ul>
            </div>

            <div className="leaflet-sidebar-content">
                <SidebarLayers />
                <SidebarInfo />
                <SidebarSettings />
            </div>
        </div>
    )
}
