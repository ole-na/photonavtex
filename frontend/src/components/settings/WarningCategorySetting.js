import React, {useState} from "react";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";

import {ThemeProvider} from "styled-components";
import { createMuiTheme } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme();

const checkBoxStyles = theme => ({
    root: {
        '&$checked': {
            color: blue[700],
        },
    },
    checked: {},
})

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);

export default function WarningCategorySetting(props) {
    const [state, setState] = useState(props.warningCategory);

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const { warningA, warningD } = state;
    const error = [warningA, warningD].filter((v) => v).length === 0;

    return (
        <div className={props.settingClasses.root}>
            <ThemeProvider theme={theme}>
                <FormControl required error={error} component="fieldset" className={props.settingClasses.formControl}>
                    <FormLabel component="legend" className={props.settingClasses.fieldsetLegend}>Warning categories</FormLabel>
                    <FormHelperText>Please select only one or both warning types</FormHelperText>
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
                </FormControl>
            </ThemeProvider>
        </div>
    );
}
