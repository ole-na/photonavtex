import React, {useState} from "react";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Slider from "@material-ui/core/Slider";
import {makeStyles} from "@material-ui/core/styles";
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
    {
        value: 100,
        label: '100nm',
    },
];

function valueText(value) {
    return `${value}nm`;
}

const useStyles = makeStyles(() => ({
    formControl: {
        border: '1px solid #000',
        borderRadius: '4px',
        padding: '20px',
        marginBottom: '2em',
        width: '100%',
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    },
    sliderMiles: {
        width: 235,
        marginTop: '1.5em',
    },
}));

export default function DistanceSetting(props) {
    const classes = useStyles();
    const [value, setValue] = useState(props.settings.distance)

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.setSettings({...props.settings, distance: newValue})
    };

    return (
        <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel id="discrete-slider-always" component="legend"><b>Distance</b></FormLabel>
            <Slider className={classes.sliderMiles}
                    value={value}
                    getAriaValueText={valueText}
                    aria-labelledby="discrete-slider-always"
                    step={5}
                    marks={marks}
                    valueLabelDisplay="on"
                    onChange={handleChange}
            />
            <FormHelperText>You can define here the maximum value for the distance to the route (in nautical miles).</FormHelperText>
        </FormControl>
    )
}
