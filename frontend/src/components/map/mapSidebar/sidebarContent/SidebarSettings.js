import React, {useEffect, useState} from 'react';
import axios from "axios";
import Loading from "../../../Loading";
import {Alert} from "@material-ui/lab";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

export default function SidebarSettings() {

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

    return (
        <div className="leaflet-sidebar-pane" id="mapSidebarSettings">
            <h3 className="leaflet-sidebar-header">Saved Settings
                <div className="leaflet-sidebar-close"><i className="fa fa-caret-right"></i></div>
            </h3>

            {isLoading ? <Loading isLoading={isLoading}/> :

                (<section>
                    {error && <Alert className="margin-bottom-m" severity="error">Oh no, something went wrong!</Alert>}

                    {mapSettingsHint &&
                        <p>Your settings are not defined. Please go to the Settings Page to define the route, distance and possible warning categories.</p>
                    }

                    {settings &&
                        <section>
                            <p>Please go to the Settings Page to change the values.</p>
                            <Grid
                                container
                                spacing={0}
                                style={{minHeight: '5vh'}}
                            >
                                <Grid item xs={6}>
                                    Selected categories:
                                </Grid>
                                <Grid item xs={6}>
                                    {settings.category}
                                </Grid>
                                <Grid item xs={6}>
                                    Distance to the route:
                                </Grid>
                                <Grid item xs={6}>
                                    {settings.distance} nm
                                </Grid>

                                <Grid item xs={6}>
                                    Saved route:
                                </Grid>
                                <Grid item xs={6}>
                                    {settings.route && (
                                        <ul className="map-route-listing">
                                            <li>
                                                Start: {settings.route.start.join(', ')}
                                            </li>

                                            {settings.route.points?.map((point, index) => {
                                                const key = "routePoint" + {index};
                                                return (
                                                    <li key={key}>
                                                        Point {index+1}: {point[0]}, {point[1]}
                                                    </li>
                                                )
                                            })}

                                            <li>End: {settings.route.end.join(', ')}</li>
                                        </ul>
                                    )}
                                </Grid>
                            </Grid>
                        </section>
                    }
                </section>)
            }



        </div>
    )

}
