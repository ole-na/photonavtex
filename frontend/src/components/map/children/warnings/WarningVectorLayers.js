import React from "react";
import WarningPoint from "./WarningPoint";
import WarningPolygon from "./WarningPolygon";
import WarningError from "./WarningError";
import WarningLine from "./WarningLine";

export default function WarningVectorLayers(props) {
    // TODO: dummy data, MongoDB data should be used
    const warnings = [
        {
            id: "warning0",
            number: "21",
            type: "", // point, polygon, circle, line
            title: "Warning Error",
            text: "Text0",
            // coords: [54.300, 11.474],
            coords: [
                [54.275, 11.299],
                [54.244, 11.391],
                [54.206, 11.283],
            ],
            distance: "15nm",
            radius: false
        },
        {
            id: "warning1",
            number: "21",
            type: "point", // point, polygon, circle, line
            title: "Warning Point",
            text: "Text1",
            coords: [54.261, 11.474],
            distance: "15nm",
            radius: false
        },
        {
            id: "warning2",
            number: "5",
            type: "point",
            title: "Warning Point",
            text: "Text2",
            coords: [54.195, 11.424],
            distance: "5nm",
            radius: true,
        },
        {
            id: "warning-line",
            number: "8",
            type: "line",
            title: "Warning Line",
            coords: [
                [54.275, 11.299],
                [54.244, 11.391],
                [54.206, 11.283],
            ],
            text: "Text3",
            distance: "20nm",
            radius: true
        },
        {
            id: "warning-polygon3",
            number: "5",
            type: "polygon",
            title: "Warning Polygon",
            coords: [
                [54.270, 11.290],
                [54.240, 11.390],
                [54.200, 11.280],
                [54.270, 11.290],
            ],
            text: "Text3",
            distance: "20nm",
            radius: true
        },
        {
            id: "warning-polygon-multi4",
            number: "124",
            type: "polygon",
            title: "Warning Multi-Polygon",
            coords: [
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
            distance: "50nm",
            radius: false,
        }
    ];

    return warnings.map((warning) => {
        switch (warning.type) {
            case 'point':
                return <WarningPoint key={warning.id} warning={warning} state="warning" />
            case 'line':
                return <WarningLine key={warning.id} warning={warning} state="warning" />
            case 'polygon':
                return <WarningPolygon key={warning.id} warning={warning} state="warning" />
            default:
                return <WarningError key={warning.id} warning={warning} state="warning" />
        }
    })

}
