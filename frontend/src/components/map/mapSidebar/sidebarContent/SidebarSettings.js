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
                        <dl className="grid">
                            <dt>Selected categories:</dt>
                            <dd>{props.settings.category}</dd>

                            <dt>Distance to the route:</dt>
                            <dd>{props.settings.distance} nm</dd>

                            <dt>Saved route:</dt>
                            <dd>&nbsp;</dd>

                            <dt className="padding-left-m">Start:</dt>
                            <dd>{props.settings.route.start.join(', ')}</dd>

                            <dt className="padding-left-m">Points</dt>
                            <dd>
                                {props.settings.route.points?.map((point, index) => {
                                    const key = `routePoint_${index}`;
                                    return (
                                        <span key={key}>
                                            {point[0]}, {point[1]}
                                        <br /></span>
                                    )
                                })}
                            </dd>

                            <dt className="padding-left-m">End:</dt>
                            <dd>{props.settings.route.end.join(', ')}</dd>
                        </dl>

                    </section>
                }
            </section>
        </div>
    )
}
