import React, {useEffect, useState} from "react";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import Button from "@material-ui/core/Button";
import {green, grey, red} from "@material-ui/core/colors";

import {makeStyles} from "@material-ui/core/styles";
import {ThemeProvider} from "styled-components";
import { createMuiTheme } from "@material-ui/core/styles";

import RoutePoint from "./RoutePoint";
import RouteHints from "./RouteHints";
import {routeServices} from "./routeServices";

const theme = createMuiTheme();

const useStyles = makeStyles((theme) => ({
    formContainer: {
        marginTop: '18px',
    },
    addButton: {
        display: 'float',
        float: 'right',
    },
}))

export default function RouteSetting(props) {
    const classes = useStyles()

    const [route, setRoute] = useState(props.route)
    const [errors, setErrors] = useState({
        start: false,
        end: false,
        points: []
    });

    const pointsValues = []
    for (let i in props.route.points) {
        pointsValues[i] = "point" + i
    }
    const [points, setPoints] = useState(pointsValues)

    // check required values for start and end only, other points are optional
    const { start, end } = route;
    const error = [ start, end ].filter((v) => v).length === 0;

    // set values of start and end to empty string and delete other points
    const handleReset = event => {
        setRoute({start: "", end: "", points: []})
        setErrors({start: false, end: false, points: []})
        setPoints([])
    }

    /* useEffect(() => {
        console.log("R:", route, "E:", errors, "P", points)
    }, [route, errors, points]) */

    // handle changes on start/end fields: update hooks for route and errors
    const handleChange = (event, item) => {
        const value = event.target.value
        const errorValue = (value === "" || !routeServices.checkRoutePointValue(value))
        setRoute({...route, [item]: value});
        setErrors({...errors, [item]: errorValue});
    }

    // handle changes on point fields: update hooks for route, errors and points
    const handleChangePoint = (event, index) => {
        const value = event.target.value
        const errorValue = (value === "" || !routeServices.checkRoutePointValue(value))

        const newRoutePoints = route.points
        newRoutePoints[index] = value
        setRoute({...route, points: newRoutePoints});

        const newErrors = errors.points
        newErrors[index] = errorValue;
        setErrors({...errors, points: newErrors});
    }

    // add new point: update route, errors, points
    const handleAddNewPoint = (event) => {
        event.preventDefault();

        // add new point to route.points
        const newRoutePoints = route.points
        newRoutePoints.push("")
        setRoute({...route, points: newRoutePoints});

        // add new point to errors.points
        const newErrorPoints = errors.points
        newErrorPoints.push(false)
        setErrors({...errors, points: newErrorPoints});

        // find the biggest number in points array and use this value for the new element (+1)
        const pointName = points.length > 0 ? (Math.max.apply(null, points) + 1) : 1
        const newPoints = points.slice();
        newPoints.push(pointName);
        setPoints(newPoints);
    }

    // delete current point from route, errors and points
    function deleteRouteItem(event, index) {
        event.preventDefault()

        // update route: delete current point from route.points list
        const newRoutePoints = route.points
        newRoutePoints.splice(index, 1)
        setRoute({...route, points: newRoutePoints});

        // update errors: delete current error from error.points list
        const newErrors = errors.points
        newErrors.splice(index, 1)
        setErrors({...errors, points: newErrors});

        // update points:  delete current error from points list
        const newPoints = points
        newPoints.splice(index, 1)
        setPoints(newPoints)
    }

    return (
        <div className={props.settingClasses.root}>
            <ThemeProvider theme={theme}>
                <FormControl required error={error} component="fieldset" className={props.settingClasses.formControl}>
                    <FormLabel component="legend" className={props.settingClasses.fieldsetLegend}>Route</FormLabel>
                    <FormHelperText>Please define start and end points of your route at least</FormHelperText>
                    <FormGroup className={classes.formContainer}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <RoutePoint name="start"
                                            id="startField"
                                            label="Start"
                                            required={true}
                                            value={route.start}
                                            error={errors.start}
                                            iconColor={green}
                                            onChange={(event) => handleChange(event, "start")}
                                            onClear={(event) => {routeServices.clearRoutePointValue(event, "startField")}}
                                />
                            </Grid>

                            {points.map((point, index) => {
                                const key = "pointField" + point
                                return (
                                    <Grid key={key} item xs={12} className="route-point-field-container">
                                        <RoutePoint name={key}
                                                    label="Point"
                                                    required={false}
                                                    value={route.points[index]}
                                                    error={errors.points[index]}
                                                    iconColor={grey}
                                                    onChange={(event) => handleChangePoint(event, index)}
                                                    onClear={(event) => {deleteRouteItem(event, index)}}
                                        />
                                    </Grid>
                                )
                            })}

                            <Grid item xs={12} id="endFieldContainer">
                                <RoutePoint name="end"
                                            id="endField"
                                            label="End"
                                            required={true}
                                            value={route.end}
                                            error={errors.end}
                                            iconColor={red}
                                            onChange={(event) => handleChange(event, "end")}
                                            onClear={(event) => {routeServices.clearRoutePointValue(event, "endField")}}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button variant="contained" color="secondary" type="reset"
                                        onClick={handleReset} startIcon={<ClearIcon />}>Reset</Button>
                                <Button variant="contained" color="secondary"
                                        className={classes.addButton}
                                        startIcon={<AddIcon />}
                                        id="addButton"
                                        onClick={(event) => {handleAddNewPoint(event)}}
                                >Add</Button>
                            </Grid>

                            <RouteHints />

                        </Grid>
                    </FormGroup>
                </FormControl>
            </ThemeProvider>
        </div>
    );
}
