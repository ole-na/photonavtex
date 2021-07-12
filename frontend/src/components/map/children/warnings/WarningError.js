import React, {useState} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const style = {
    zIndex: 3000,
    position: 'fixed',
    inset: '0px',
};

export default function WarningError(props) {
    const warning = props.warning;

    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog id="mapWarningError"
                style={style}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
            <DialogTitle>{"Error with warning data"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <p>The position of this warning can not be shown on the map.</p>
                    <h3>The following position types are possible:</h3>
                    <List className="error-position-types">
                        <ListItem>
                            <ListItemText primary="Point" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Line" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Polygon" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Multipolygon" />
                        </ListItem>
                    </List>

                    <Divider />

                    <h3>NavTex Data ({warning.title})</h3>
                    <div className="overflow-wrap">
                        <p>
                            Position: {warning.position.map(item => item).reduce((acc, x) => acc === null ? x : <span>[{acc} , {x}]</span>, null)}
                        </p>
                    </div>
                    <p>Text: {warning.text}</p>
                    <p>GeoObject: {warning.geoObject}</p>
                    <p>Min.distance from route: {warning.distance}</p>
                    <p>Radius: {warning.radius}</p>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}
