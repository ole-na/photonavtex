import React, {useEffect, useState} from "react";
import {Popup} from "react-leaflet";
import calculateDistance from "../../../../services/calculateDistance";
import getGeoCurrentPosition from "../../../../services/getGeoCurrentPosition";

export default function WarningPopup(props) {
    const warning = props.warning;
    const [currentState, setCurrentState] = useState({
        hasLocation: false,
        coords: [],
        text: "Error",
        url: ""
    });

    useEffect(() => {
        const currentPosition = getGeoCurrentPosition();
        if (currentPosition) {
            setCurrentState(currentPosition);
        }
    }, [])

    const distanceToMe = (currentState && currentState.hasLocation && currentState.coords && currentState.coords.speed)
        ? (calculateDistance(
            warning.coords.lat,
            warning.coords.long,
            currentState.coords.latitude,
            currentState.coords.longitude
        ) + "nm") : "undefined";

    const warningPosition = (warning.type === "point" ) ?
        (warning.coords[0] + ", " + warning.coords[1]) : warning.coords

    return(
        <Popup>
            <h3>
                {(props.state && props.state === "new") && <span>New</span>}
                NavTex ({warning.number})
            </h3>
            <div className="overflow-wrap">
                <p>Position: {warningPosition}</p>
            </div>
            <p>Text: {warning.text}</p>
            <p>Type: {warning.type}</p>
            <p>Min. distance from route: {warning.distance}</p>
            <p>Radius: {warning.radius}</p>
        </Popup>
    )
}