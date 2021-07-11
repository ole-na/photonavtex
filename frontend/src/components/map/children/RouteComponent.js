import React, {useEffect, useState} from "react";
import {Polyline} from "react-leaflet";
import Loading from "../../Loading";

// Dummy data for route testing, now not used
const dummyRouteCoords = [
    [54.083, 11.070],
    [54.099, 11.226],
    [54.109, 11.427],
    [54.162, 11.537],
    [54.233, 11.618],
    [54.291, 11.822],
    [54.306, 12.043],
    [54.342, 12.295],
    [54.455, 12.354],
    [54.455, 12.358],
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
        routeCoordsArray.push(endRoute)
        props.settings.route.points?.map((point) => {
            routeCoordsArray.push(point)
        })

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