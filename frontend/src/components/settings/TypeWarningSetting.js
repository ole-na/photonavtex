import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";

import {makeStyles} from "@material-ui/core/styles";
import {ThemeProvider} from "styled-components";
import { createMuiTheme } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme();

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        border: '1px solid #000',
        borderRadius: '4px',
        padding: '20px',
        marginBottom: '2em',
        width: '100%',
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    },
    formLabel: {
        color: '#000',
    },
    fieldsetLegend: {
        fontWeight: 'bold',
    },
}));

export default function TypeWarningSetting() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        warningA: true,
        warningD: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const { warningA, warningD } = state;
    const error = [warningA, warningD].filter((v) => v).length === 0;

    const checkBoxStyles = theme => ({
        root: {
            '&$checked': {
                color: blue[700],
            },
        },
        checked: {},
    })

    const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);

    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <FormControl required error={error} component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend" className={classes.fieldsetLegend}>Warning categories</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<CustomCheckbox checked={warningA} onChange={handleChange} name="warningA" />}
                            label="A: Nautical warnings"
                        />
                        <FormControlLabel
                            control={<CustomCheckbox checked={warningD} onChange={handleChange} name="warningD" />}
                            label="D: Search and rescue information and pirate warnings"
                        />
                    </FormGroup>
                    <FormHelperText>Please select only one or both warning types</FormHelperText>
                </FormControl>
            </ThemeProvider>
        </div>
    );
}
