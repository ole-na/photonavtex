import React, {useEffect, useState} from "react";
import L from "leaflet";
import WarningPoint from "./WarningPoint";
import WarningPolygon from "./WarningPolygon";
import WarningError from "./WarningError";
import WarningLine from "./WarningLine";

export default function WarningVectorLayers(props) {

    const warningDataForLineOrArea = (position) => {
        const positionArray = []
        position.map((coords, index) => {
            positionArray.push(Object.values(coords))
        })
        return Object.values(positionArray)
    }

    return props.warnings.map((warning) => {
        let warningData = warning
        switch (warning.geoObject) {
            case 'POINT':
                // convert repository position (object) to array
                warningData = {...warning, position: Object.values(warning.position[0])}
                return <WarningPoint key={warning.id} warning={warningData} state="warning" />
            case 'LINE':
                warningData = {...warning, position: warningDataForLineOrArea(warning.position)}
                return <WarningLine key={warning.id} warning={warningData} state="warning" />
            case 'AREA':
                warningData = {...warning, position: warningDataForLineOrArea(warning.position)}
                return <WarningPolygon key={warning.id} warning={warningData} state="warning" />
            default:
                return <WarningError key={warning.id} warning={warningData} state="warning" />
        }
    })
}
