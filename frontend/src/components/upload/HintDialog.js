import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import InfoIcon from "@material-ui/icons/Info";
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

export default function HintDialog({warningTitle}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton className={classes.hintButton} aria-label="hint" aria-describedby="warningTextHint" type="button" onClick={handleClickOpen}>
                <InfoIcon color='secondary' />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="text-alert-dialog-title"
                aria-describedby="text-alert-dialog-description"
            >
                <DialogActions>
                    <IconButton aria-label="close dialog" type="button" onClick={handleClose} autoFocus>
                        <CancelIcon color='primary' />
                    </IconButton>
                </DialogActions>
                <DialogContent className={classes.dialogContent}>
                    <DialogContentText id="text-alert-dialog-description">
                        The text of message can be changed, if some words are not recognized correctly.
                        Please compare the text below with image text and change it if desired.
                    </DialogContentText>
                    <Alert severity="warning" className={classes.hintAlert}>
                        The editable text should not include the words 'ZCZC' and 'NNNN'.
                        The first word in this field should be a message identifier{warningTitle !== "" && <b> {warningTitle}</b>}.
                        But the image should have these words on the begin/end.
                    </Alert>
                </DialogContent>
            </Dialog>
        </div>
    );
}