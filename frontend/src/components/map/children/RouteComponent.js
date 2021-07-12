import React, {useEffect, useState} from "react";
import {Polyline} from "react-leaflet";
import Loading from "../../Loading";

// Dummy data for route testing, now not used
const dummyRouteCoords = [
    [54.083, 11.070],
    [54.291, 12.045],
    [54.455, 12.358],
];

const colorOptions = { color: 'lime', weight: 5 };

export default function RouteComponent(props) {
    const [isRouteLoading, setIsRouteLoading] = useState(false)
    const [routeCoords, setRouteCoords] = useState([])
    const [displayRoute, setDisplayRoute] = useState(false)

    useEffect(() => {
        setIsRouteLoading(true);
        const startRoute = props.settings.route.start
        const endRoute = props.settings.route.end
        const routeCoordsArray = []
        routeCoordsArray.push(startRoute)
        props.settings.route.points?.map((point) => {
            routeCoordsArray.push(point)
        })
        routeCoordsArray.push(endRoute)
        setRouteCoords(routeCoordsArray)
        if(routeCoordsArray.length > 0) {

            setDisplayRoute(true)
        }
        setIsRouteLoading(false);
    }, []);

    return (<>
        {isRouteLoading && <Loading isLoading={isRouteLoading}/>}
        {!isRouteLoading && displayRoute && <Polyline pathOptions={colorOptions} positions={routeCoords}/>}
    </>)
}