import React, {useEffect, useState} from "react";
import { getNewWarning } from '../services/warningApi'
import WarningPoint from "./WarningPoint";
import WarningLine from "./WarningLine";
import WarningPolygon from "./WarningPolygon";
import WarningError from "./WarningError";

export default function NewWarning() {

    // const [warning, setWarning] = useState(null)
    /* const [warning, setWarning] = useState({
        text: "Lorem ipsum",
        category: "A", // A, D, other
        coords: [{
            lat: 54.291,
            long: 11.822,
        }],
        number: "21",
        type: "point", // point, polygon, circle, line, other
        title: "Warning Point",
        distance: 14,
        radius: 0,
    });

    useEffect(() => {
        getNewWarning().then(setWarning)
    }, []) */

    const warning = [{
        text: "Lorem ipsum",
        category: "A", // A, D, other
        coords: [{
            lat: 54.291,
            long: 11.822,
        }],
        number: "21",
        type: "point", // point, polygon, circle, line, other
        title: "Warning Point",
        distance: 14,
        radius: 0,
    }]

    switch (warning.type) {
        case 'point':
            return <WarningPoint key={warning.id} warning={warning} state="new" />
        case 'line':
            return <WarningLine key={warning.id} warning={warning} state="new" />
        case 'polygon':
            return <WarningPolygon key={warning.id} warning={warning} state="new" />
        default:
            return <WarningError warning={warning} state="new" />
    }

}
