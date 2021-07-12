import React, {useEffect, useState} from "react";
import L from "leaflet";
import WarningPoint from "./WarningPoint";
import WarningPolygon from "./WarningPolygon";
import WarningError from "./WarningError";
import WarningLine from "./WarningLine";
import axios from "axios";

export default function WarningVectorLayers(props) {
    // Dummy data for warnings testing, now not used
    const dummyWarnings = [
        {
            id: "warning0", // warning with error, type is not given
            geoObject: "", // point, polygon, circle, line
            title: "Warning Error",
            text: "Text0",
            // position: [54.300, 11.474],
            position: [
                [54.275, 11.299],
                [54.244, 11.391],
                [54.206, 11.283],
            ],
            radius: false,
            category: "A"
        },
        {
            id: "12345",
            title: "PA18",
            geoObject: "POINT", // point, polygon, circle, line
            text: "PA18\n" +
                "NETHERLANDS COASTGUARD\n" +
                "NAVIGATIONAL WARNING NR. 18 291527 UTC JAN\n" +
                "MAAS APPROACH\n" +
                "SEVERAL LIDAR BUOYS ESTABLISHED\n" +
                "IN A RADIUS OF 500 METERS AROUND\n" +
                "GOEREE PLATFORM 51-55N 003-40E",
            position: [54.195243, 11.424567],
            radius: false,
            category: "A"
        },
        {
            id: "warning2",
            title: "DA33",
            geoObject: "POINT",
            text: "Text2",
            position: [54.261111, 11.474444],
            radius: true,
            category: "A"
        },
        {
            id: "warning-line",
            title: "CA88",
            geoObject: "LINE",
            position: [
                [54.275, 11.299],
                [54.244, 11.391],
                [54.206, 11.283],
            ],
            text: "Text3",
            radius: true,
            category: "A"
        },
        {
            id: "warning-polygon3",
            title: "SA55",
            geoObject: "AREA",
            position: [
                [54.270, 11.290],
                [54.240, 11.390],
                [54.200, 11.280],
                [54.270, 11.290],
            ],
            text: "Text3",
            radius: false,
            category: "A"
        },
        {
            id: "warning-polygon-multi4",
            title: "PA12",
            geoObject: "AREA",
            position: [
                [
                    [54.313, 11.750],
                    [54.275, 11.761],
                    [54.200, 11.740],
                    [54.313, 11.750],
                ],
                [
                    [54.170, 11.633],
                    [54.228, 11.618],
                    [54.243, 11.588],
                    [54.310, 11.624],
                    [54.309, 11.627],
                    [54.170, 11.633]
                ],
            ],
            text: "Text3",
            radius: false,
            category: "A"
        }
    ];

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
