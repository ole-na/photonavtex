import React from "react";
import Alert from '@material-ui/lab/Alert';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    marginTop: {
        marginTop: '1.5em',
    }
}));

export default function UploadErrors(props) {
    const classes = useStyles()

    return (<>
        {props.textError && (
            <Alert severity="error" className={classes.marginTop}>
                It's impossible to convert this image to the text. Please try again.
            </Alert>
        )}

        {props.errors && (
            <Alert severity="error" className={classes.marginTop}>
                {props.errors.maxNumber &&
                "Number of selected images exceed maxNumber."
                }

                {props.errors.acceptType &&
                "Your selected file type is not allow."
                }

                {props.errors.maxFileSize &&
                "Selected file size exceed maxFileSize."
                }

                {props.errors.resolution &&
                "Selected file is not match your desired resolution."
                }
            </Alert>
        )}

    </>);
}
