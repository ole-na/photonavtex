import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Slider from "@material-ui/core/Slider";
import {createMuiTheme, makeStyles} from "@material-ui/core/styles";
import {ThemeProvider} from "styled-components";
import FormHelperText from "@material-ui/core/FormHelperText";

const marks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 15,
        label: '15',
    },
    {
        value: 30,
        label: '30',
    },
    {
        value: 50,
        label: '50nm',
    },
];

function valuetext(value) {
    return `${value}nm`;
}

const theme = createMuiTheme();
const useStyles = makeStyles((theme) => ({
    sliderMiles: {
        width: 235,
        marginTop: '1.5em',
    },
}));

export default function DistanceSetting(props) {
    const classes = useStyles();
    return (
        <div className={props.settingClasses.root}>
            <ThemeProvider theme={theme}>
                <FormControl component="fieldset" className={props.settingClasses.formControl}>
                    <FormLabel id="discrete-slider-always" component="legend"
                               className={props.settingClasses.fieldsetLegend}>Distance</FormLabel>
                    <Slider className={classes.sliderMiles}
                            defaultValue={15}
                            getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider-always"
                            step={5}
                            marks={marks}
                            valueLabelDisplay="on"
                    />
                    <FormHelperText>You can define here the maximale value for the distance from the route (in nautical miles).</FormHelperText>
                </FormControl>
            </ThemeProvider>
        </div>
    )
}
