import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import {AddAPhoto} from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

export default function UploadButtons() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <AddAPhoto fontSize={"large"} />
                </IconButton>
            </label>
        </div>
    );
}