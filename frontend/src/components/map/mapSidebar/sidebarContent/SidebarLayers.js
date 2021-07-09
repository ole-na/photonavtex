import React from 'react';

export default function SidebarLayers() {
    return (
        <div className="leaflet-sidebar-pane" id="mapSidebarLayers">
            <h3 className="leaflet-sidebar-header">Layers
                <div className="leaflet-sidebar-close"><i className="fa fa-caret-right"></i></div>
            </h3>
            <p>
                OpenStreetMap is a base map and an open source project with the aim of creating a free map of the world.
                There will be data on roads, railway, signs, rivers and much more in the database.
                There are currently more than 300,000 contributors in the project.
                Some of them also contribute to OpenSeaMap.
            </p>
            <p>
                OpenStreetMap DE is an OpenStreetMap with a "German" card style.
            </p>
            <p>
                OpenSeaMap is an overlay map layer and an open source, worldwide project to create a free nautical chart.
                It's a subproject of OpenStreetMap and uses its database.
            </p>
        </div>
    )
}