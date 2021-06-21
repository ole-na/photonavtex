import React from "react";
import WarningCircle from "./WarningCircle";
import WarningPolygon from "./WarningPolygon";

export default function WarningVectorLayers() {
    // dummy data: MongoDB data should be used
    const warnings = [
        {
            id: "warning1",
            type: "circle",
            title: "Warning Circle",
            lat: 54.261,
            long: 11.474,
            coords: [54.261, 11.474]
        },
        {
            id: "warning2",
            type: "circle",
            title: "Warning Circle",
            lat: 54.195,
            long: 11.424,
            coords: [54.195, 11.424]
        },
        {
            id: "warning-polygon3",
            type: "polygon",
            title: "Warning Polygon",
            coords: [
                [54.275, 11.299],
                [54.244, 11.391],
                [54.206, 11.283],
            ]
        },
        {
            id: "warning-polygon-multi4",
            type: "polygon",
            title: "Warning Multi-Polygon",
            coords: [
                [
                    [54.313, 11.750],
                    [54.275, 11.761],
                    [54.200, 11.740],
                ],
                [
                    [54.170, 11.633],
                    [54.228, 11.618],
                    [54.243, 11.588],
                    [54.310, 11.624],
                    [54.309, 11.627],
                ],
            ]
        }
    ];

    return warnings.map((warning) => {
        switch (warning.type) {
            case 'circle':
                return <WarningCircle key={warning.id} warning={warning} />
            case 'polygon':
                return <WarningPolygon key={warning.id} warning={warning} />
            default:
                return null;
        }
    });
}
