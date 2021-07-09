import React from "react";
import MapContainerComponent from "../components/map/MapContainerComponent";

export default function MapPage() {
    return (
        <div className="page-content-container">
            <h2>Map</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
            </p>

            <MapContainerComponent />
        </div>
    );
}
