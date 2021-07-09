import React, {useEffect, useState} from 'react';
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

export default function  MapContainerComponent() {
    const [map, setMap] = useState(null);
    const mapOptions = mapConfig.options;
    const styles = {targetDiv: { height: 'calc(100vh - 250px)'}}

    const [settings, setSettings] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [mapSettingsHint, setMapSettingsHint] = useState(false)

    const getSettingsFromRepository = () => {
        setIsLoading(true);
        axios
            .get(`/settings/olena` )
            .then((response) => response.data)
            .then((settingsResponse) => {
                if(!settingsResponse) {
                    setMapSettingsHint(true)
                    setIsLoading(false);
                    return
                }
                setSettings(settingsResponse)
                setIsLoading(false);
                setError(false);
            })
            .catch((error) => {
                console.error(error.message)
                setIsLoading(false);
                setError(true);
            });
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
                            <MapContainer center={mapOptions.center}
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

                                <WarningVectorLayers settings={settings} />
                                <RouteComponent settings={settings} />
                            </MapContainer>
                        </div>
                    }
                </section>)
        }

    </>)
}