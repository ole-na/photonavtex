import React from "react";
import {Box, InputAdornment, TextField} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import {makeStyles} from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme();

const useStyles = makeStyles((theme) => ({
    startBox: {
        marginTop: '18px',
    },
    textField: {
        minWidth: '215px',
        maxWidth: '300px',
        paddingLeft: '0px',
    },
    buttonDelete: {
        margin: theme.spacing(1),
        width: '2rem',
        minWidth: '2rem',
        height: '2.5rem',
    },
    adornedStart: {
        marginLeft: '-8px',
        width: '18px',
    },
    buttonIcon: {
        marginRight: '8px',
        marginLeft: '8px',
    }
}));

export default function RoutePoint(props) {
    const classes = useStyles();

    return (
        <Box display="flex">
            <TextField name={props.name} id={props.id}
                       required={props.required}
                       label={props.label}
                       defaultValue={props.value}
                       placeholder="Lat., Long."
                       error={props.error}
                       helperText="e.g. -54.261, 11.474 **"
                       variant="outlined"
                       className={classes.textField}
                       onBlur={props.onBlur}
                       onChange={props.onChange}
                       InputProps={{
                           startAdornment: (
                               <InputAdornment position="start" className={classes.adornedStart}>
                                   <MoreVertIcon style={{ color: props.iconColor[500] }} />
                               </InputAdornment>
                           ),
                       }}
            />
            <IconButton variant="contained"
                        color="secondary"
                        className={classes.buttonDelete}
                        onClick={props.onClear}
            >
                {props.label === "Point" ? <DeleteForeverIcon /> : <DeleteIcon />}
            </IconButton>
        </Box>
    )
}
