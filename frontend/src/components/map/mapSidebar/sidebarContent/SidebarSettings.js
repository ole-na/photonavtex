import React from 'react';
import Grid from "@material-ui/core/Grid";

export default function SidebarSettings(props) {

    return (
        <div className="leaflet-sidebar-pane" id="mapSidebarSettings">
            <h3 className="leaflet-sidebar-header">Saved Settings
                <div className="leaflet-sidebar-close"><i className="fa fa-caret-right"></i></div>
            </h3>
            <section>
                {props.mapSettingsHint &&
                    <p>Your settings are not defined. Please go to the Settings Page to define the route, distance and possible warning categories.</p>
                }

                {props.settings &&
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
                                {props.settings.category}
                            </Grid>
                            <Grid item xs={6}>
                                Distance to the route:
                            </Grid>
                            <Grid item xs={6}>
                                {props.settings.distance} nm
                            </Grid>

                            <Grid item xs={6}>
                                Saved route:
                            </Grid>
                            <Grid item xs={6}>
                                {props.settings.route && (
                                    <ul className="map-route-listing">
                                        <li>
                                            Start: {props.settings.route.start.join(', ')}
                                        </li>

                                        {props.settings.route.points?.map((point, index) => {
                                            const key = "routePoint" + {index};
                                            return (
                                                <li key={key}>
                                                    Point {index+1}: {point[0]}, {point[1]}
                                                </li>
                                            )
                                        })}

                                        <li>End: {props.settings.route.end.join(', ')}</li>
                                    </ul>
                                )}
                            </Grid>
                        </Grid>
                    </section>
                }
            </section>
        </div>
    )
}
