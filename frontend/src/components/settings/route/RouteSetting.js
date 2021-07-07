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

import RoutePoint from "./RoutePoint";
import RouteHints from "./RouteHints";
import * as routeServices from "./routeServices";

const useStyles = makeStyles(() => ({
    formControl: {
        border: '1px solid #000',
        borderRadius: '4px',
        padding: '20px',
        marginBottom: '2em',
        width: '100%',
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    },
    formContainer: {
        marginTop: '18px',
    },
    addButton: {
        display: 'float',
        float: 'right',
    },
}))

const pointsValues = []

export default function RouteSetting(props) {
    const classes = useStyles()

    const [route, setRoute] = useState(props.settings.route)
    const [errors, setErrors] = useState({
        start: false,
        end: false,
        points: []
    });

    // initial array hook with input name values for points (not start and end)
    if(props.settings.route && props.settings.route.points) {
        props.settings.route.points.map((index) => {
            pointsValues[index] = index
        })
    }

    const [points, setPoints] = useState(pointsValues)

    // set values of start and end to empty string and delete other points
    const handleReset = event => {
        setRoute({start: "", end: "", points: []})
        setErrors({start: false, end: false, points: []})
        setPoints([])
        props.setSettings({...props.settings, route: []})
    }

    // handle changes on start/end fields: update hooks for route and errors
    const handleChange = (event) => {
        let value = event.target.value
        let name = event.target.name;
        const errorValue = !routeServices.checkRoutePointValue(value)
        setRoute({...route, [name]: value});
        setErrors({...errors, [name]: errorValue});
    }

    // handle changes on point fields: update hooks for route, errors and points
    const handleChangePoint = (event, index) => {
        const {value} = event.target
        const errorValue = (value === "" || !routeServices.checkRoutePointValue(value))

        const newRoutePoints = [...route.points]
        newRoutePoints[index] = value
        setRoute({...route, points: newRoutePoints});

        const newErrors = [...errors.points]
        newErrors[index] = errorValue;
        setErrors({...errors, points: newErrors});
    }

    const handleChangeOnBlur = (event) => {
        event.preventDefault()
        props.setSettings({...props.settings, route: {...route}})
    }

    // add new point: update route, errors, points
    const handleAddNewPoint = (event) => {
        event.preventDefault();

        // add new point to route.points
        const newRoutePoints = [...route.points]
        newRoutePoints.push("")
        setRoute({...route, points: newRoutePoints});
        props.setSettings({...props.settings, route: {...props.settings.route, points: newRoutePoints}})

        // add new point to errors.points
        const newErrorPoints = [...errors.points]
        newErrorPoints.push(false)
        setErrors({...errors, points: newErrorPoints});

        // find the biggest number in points array and use this value for the new element (+1)
        const pointName = points.length > 0 ? (Math.max(...points) + 1) : 1
        const newPoints = [...points]
        newPoints.push(pointName);
        setPoints(newPoints);
    }

    // delete current point from route, errors and points
    function deleteRouteItem(event, index) {
        event.preventDefault()

        // update route: delete current point from route.points list
        const newRoutePoints = [...route.points]
        newRoutePoints.splice(index, 1)
        setRoute({...route, points: newRoutePoints});
        props.setSettings({...props.settings, route: {...props.settings.route, points: newRoutePoints}})

        // update errors: delete current error from error.points list
        const newErrors = [...errors.points]
        newErrors.splice(index, 1)
        setErrors({...errors, points: newErrors});

        // update points:  delete current error from points list
        const newPoints = [...points]
        newPoints.splice(index, 1)
        setPoints(newPoints)
    }

    return (
        <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend"><b>Route</b></FormLabel>
            <FormHelperText>Please define start and end points of your route at least</FormHelperText>
            <FormGroup className={classes.formContainer}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <RoutePoint name="start"
                                    id="startField"
                                    label="Start"
                                    required={true}
                                    value={route.start.toString()}
                                    error={errors.start}
                                    iconColor={green}
                                    settings={props.settings} setSettings={props.setSettings}
                                    onBlur={(event) => handleChangeOnBlur(event)}
                                    onChange={handleChange}
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
                                            value={route.points[index].toString()}
                                            error={errors.points[index]}
                                            iconColor={grey}
                                            onBlur={(event) => handleChangeOnBlur(event)}
                                            onChange={(event) => handleChangePoint(event, index)}
                                            onClear={(event) => deleteRouteItem(event, index)}
                                />
                            </Grid>
                        )
                    })}

                    <Grid item xs={12} id="endFieldContainer">
                        <RoutePoint name="end"
                                    id="endField"
                                    label="End"
                                    required={true}
                                    value={route.end.toString()}
                                    error={errors.end}
                                    iconColor={red}
                                    onBlur={(event) => handleChangeOnBlur(event, props.settings)}
                                    onChange={handleChange}
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
    );
}
