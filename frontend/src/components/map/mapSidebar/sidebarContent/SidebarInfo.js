import React from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    legendListElem: {
        padding: 0
    },
    legendIcon: {
        minWidth: '30px'
    }
});

export default function SidebarInfo() {
    const classes = useStyles();
    return (
        <div className="leaflet-sidebar-pane" id="mapSidebarInfo">
            <h3 className="leaflet-sidebar-header">Info
                <div className="leaflet-sidebar-close"><i className="fa fa-caret-right"></i></div>
            </h3>
            <List className="map-legend">
                <ListItem className={classes.legendListElem}>
                    <ListItemIcon className={classes.legendIcon}><i className='icon-route'></i></ListItemIcon>
                    <ListItemText primary="Route" />
                </ListItem>
                <ListItem className={classes.legendListElem}>
                    <ListItemIcon className={classes.legendIcon}><i className='icon-warning'></i></ListItemIcon>
                    <ListItemText primary="NavTex" />
                </ListItem>
                <ListItem className={classes.legendListElem}>
                    <ListItemIcon className={classes.legendIcon}><i className='icon-current-position'></i></ListItemIcon>
                    <ListItemText primary="Current position" />
                </ListItem>
            </List>
        </div>
    )
}
