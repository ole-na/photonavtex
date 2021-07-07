import React, {useEffect, useState} from "react";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";
import withStyles from "@material-ui/core/styles/withStyles";
import blue from "@material-ui/core/colors/blue";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    formControl: {
        border: '1px solid #000',
        borderRadius: '4px',
        padding: '20px',
        marginBottom: '2em',
        width: '100%',
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    },
}))

const checkBoxStyles = () => ({
    root: {
        '&$checked': {
            color: blue[700],
        },
    },
    checked: {},
})

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);

export default function WarningCategorySetting(props) {
    const classes = useStyles()
    const [category, setCategory] = useState(props.settings.category)
    const [state, setState] = useState({
        warningA: category.includes("A"),
        warningD: category.includes("D")
    });

    const { warningA, warningD } = state;
    const error = [warningA, warningD].filter((v) => v).length === 0;

    const handleChange = (event) => {
        const name = event.target.name
        setState({ ...state, [name]: event.target.checked });

        const catValue = (name === "warningA") ? "A" : "D"
        const catArray = [...category]
        if(event.target.checked) {
            if(!catArray.includes(catValue))
                catArray.push(catValue);
        } else if (catArray.includes(catValue)) {
            catArray.splice(catArray.indexOf(name), 1)
        }
        setCategory([...catArray])
        props.setSettings({...props.settings, category: catArray})
    };

    return (
        <FormControl required error={error} component="fieldset" className={classes.formControl}>
            <FormLabel component="legend"><b>Warning categories</b></FormLabel>
            <FormHelperText>Please select only one or both warning types</FormHelperText>
            <FormGroup>
                <FormControlLabel
                    control={<CustomCheckbox checked={state.warningA} onChange={handleChange} name="warningA" />}
                    label="A: Nautical warnings"
                />
                <FormControlLabel
                    control={<CustomCheckbox checked={state.warningD} onChange={handleChange} name="warningD" />}
                    label="D: Search and rescue information and pirate warnings"
                />
            </FormGroup>
        </FormControl>
    );
}
