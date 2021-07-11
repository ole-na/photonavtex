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
            warning.position[0],
            warning.position[1],
            currentState.coords.latitude,
            currentState.coords.longitude
        ) + "nm") : "undefined";

    return(
        <Popup>
            <h3>
                {(props.state && props.state === "new") && <span>New</span>}
                NavTex ({warning.title})
            </h3>
            <div className="overflow-wrap">
                <details>
                    <summary>Position</summary>
                    {warning.position && warning.position.length > 0 && warning.position.map((pair, index) => {
                        const key = "warningPosition" + index;
                        const pairs = pair[0] ? pair[0]+", "+pair[1] : pair
                        return (
                            <span key={key}>
                                {pairs}<br/>
                            </span>
                        )
                    })}
                </details>
            </div>
            <p>
                <details>
                    <summary>Text</summary>
                    {warning.text}
                </details>
            </p>
            <p>GeoObject: {warning.geoObject}</p>
            <p>Min. distance from route: {warning.distance}</p>
            <p>Distance to me: {distanceToMe}</p>
            <p>Radius: {warning.radius ? "yes" : "no"}</p>
        </Popup>
    )
}