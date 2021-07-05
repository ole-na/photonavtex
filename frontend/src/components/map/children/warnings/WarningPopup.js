import React, {useEffect, useState} from "react";
import {Popup} from "react-leaflet";
import calculateDistance from "../../../../services/calculateDistance";
import getGeoCurrentPosition from "../../../../services/getGeoCurrentPosition";
import Button from "@material-ui/core/Button";

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
                NavTex
                ({warning.category}{warning.number})
            </h3>
            <div className="overflow-wrap">
                <p>Position: {warningPosition}</p>
            </div>
            <p>Text: {warning.text}</p>
            <p>Category: {warning.type}</p>
            <p>Min. distance from route: {warning.distance}</p>
            <p>Distance to me: {distanceToMe}</p>
            {warning.radius > 0 &&
                <p>Radius: {warning.radius}</p>
            }
            {(props.state && props.state === "new") &&
                <Button>Save</Button>
            }
        </Popup>
    )
}