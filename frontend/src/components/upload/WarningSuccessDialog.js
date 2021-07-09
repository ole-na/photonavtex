import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from '@material-ui/icons/Cancel';
import {Alert} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    hintAlert: {
        marginTop: '1.5em',
        marginBottom: '2em',
    },
    hintButton: {
        padding: '0',
        marginTop: '-6px',
    },
    dialogContent: {
        paddingTop: '0',
        marginTop: '0',
    }
}));

export default function WarningSuccessDialog(props) {
    const classes = useStyles();

    const handleClose = () => {
        props.setOpenSuccesDialog(false);
    };

    return (
        <Dialog
            open={props.openSuccessDialog}
            onClose={handleClose}
            aria-labelledby="text-alert-dialog-title"
            aria-describedby="text-alert-dialog-description"
        >
            <DialogActions>
                <IconButton aria-label="close dialog" type="button" onClick={handleClose} autoFocus>
                    <CancelIcon color="primary" aria-hidden="true" />
                </IconButton>
            </DialogActions>
            <DialogContent className={classes.dialogContent}>
                <DialogContentText id="text-alert-dialog-description">
                    Your warning was saved
                </DialogContentText>
                <Alert severity="success" className={classes.hintAlert}>
                    The changes you made on the current page have been successfully saved.
                    If you would like to see all warnings, please go to the <a href="../map">Map Page</a> or <a href="../warnings">Warnings Page</a>.
                </Alert>
            </DialogContent>
        </Dialog>
    );
}