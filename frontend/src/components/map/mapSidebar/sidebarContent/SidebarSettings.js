import React, { useEffect } from 'react';

export default function SidebarSettings() {
    return (
        <div className="leaflet-sidebar-pane" id="mapSidebarSettings">
            <h3 className="leaflet-sidebar-header">Saved Settings
                <div className="leaflet-sidebar-close"><i className="fa fa-caret-right"></i></div>
            </h3>
            <p>Please go to the Settings Page to change the values.</p>

        </div>
    )

}
