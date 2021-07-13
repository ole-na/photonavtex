import React, {useContext, useEffect, useState} from 'react';
import "leaflet/dist/leaflet.css";
import {MapContainer} from 'react-leaflet';
import {NmScale} from "@marfle/react-leaflet-nmscale";

import TileLayerComponent from "./children/TileLayerComponent";
import WarningVectorLayers from "./children/warnings/WarningVectorLayers";
import RouteComponent from "./children/RouteComponent";
import LocateControl from './controlElements/LocateControl';
import {mapConfig} from "./mapConfig";
import MapSidebarComponent from "./mapSidebar/MapSidebarComponent";
import NauticalRulerMeasureComponent from "./controlElements/NauticalRulerMeasureComponent";

import "../../css/customLeaflet.css";
import axios from "axios";
import Loading from "../Loading";
import {Alert} from "@material-ui/lab";
import TypeAndAuthContext from "../login/context/TypeAndAuthContext";

export default function  MapContainerComponent() {
    const [map, setMap] = useState(null);
    const mapOptions = mapConfig.options;
    const styles = {targetDiv: { height: 'calc(100vh - 250px)'}}

    const [settings, setSettings] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [mapSettingsHint, setMapSettingsHint] = useState(false)
    const [center, setCenter] = useState(mapOptions.center)

    const [warnings, setWarnings] = useState([])

    const {token} = useContext(TypeAndAuthContext);
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        },
    };

    const getWarningsFromRepository = () => {
        // props.setIsLoading(true);
        axios
            .get(`/api/warning`, config)
            .then((response) => response.data)
            .then((allWarnings) => {
                if(!allWarnings) {
                    // setMapWarningsHint(true)
                    setWarnings([])
                    setIsLoading(false);
                    return
                }
                setWarnings(allWarnings)
                console.log("Warningslist", allWarnings)
            })
            .catch((error) => {
                console.error("Warnings", error.message)

            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const getSettingsFromRepository = () => {
        setIsLoading(true);
        axios
            .get(`/api/settings`, config)
            .then((response) => response.data)
            .then((settingsResponse) => {
                if(!settingsResponse) {
                    setMapSettingsHint(true)
                    setIsLoading(false);
                    return
                }
                setSettings(settingsResponse)
                const routeStartLatLong = settingsResponse.route.start

                // locate map to current position if geolocation possible or to route start
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        const currentLatLong = [position.coords.latitude, position.coords.longitude]
                        setCenter(currentLatLong)
                        setError(false);
                    }, function() {
                        setCenterToRouteStart(routeStartLatLong);
                    });
                } else {
                    setCenterToRouteStart(routeStartLatLong);
                }
            })
            .catch((error) => {
                console.error(error.message)
                setError(true);
            })
            .finally(() => {
                getWarningsFromRepository()
            });
    }

    function setCenterToRouteStart(routeStartLatLong) {
        const routePosition = routeStartLatLong
        if(routePosition.length == 2) {
            setCenter(routePosition)
        }
        setError(false);
        setIsLoading(false);
    }

    useEffect(() => {
        getSettingsFromRepository()
    },[]);

    return (<>
        {isLoading ? <Loading isLoading={isLoading}/> :

                (<section>
                    {error && <Alert className="margin-bottom-m" severity="error">Oh no, something went wrong!</Alert>}

                    {mapSettingsHint &&
                    <p>Your settings are not defined. Please go to the Settings Page to define the route, distance and possible warning categories.</p>
                    }

                    {settings &&
                        <div id="map">
                            <MapContainer center={center}
                                          zoom={mapOptions.zoom}
                                          scrollWheelZoom={mapOptions.scrollWheelZoom}
                                          style={styles.targetDiv} fadeAnimation={true}
                                          markerZoomAnimation={true}
                                          whenCreated={map => setMap(map)}
                            >
                                <MapSidebarComponent settings={settings} mapSettingsHint={mapSettingsHint} />

                                <TileLayerComponent />

                                <LocateControl />

                                <NauticalRulerMeasureComponent />
                                <NmScale />

                                <WarningVectorLayers settings={settings} warnings={warnings} />
                                <RouteComponent settings={settings} />
                            </MapContainer>
                        </div>
                    }
                </section>)
        }

    </>)
}