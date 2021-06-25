import React, { useEffect } from 'react';
import L from 'leaflet';
import {useMap} from "react-leaflet";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MapIcon from "@material-ui/icons/Mail";
import LayersIcon from "@material-ui/icons/Layers";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InfoIcon from "@material-ui/icons/Info";
import ReactDOMServer from "react-dom/server";

export default function _SidebarInfoContent() {
    const legendList = (
        <List>
            <ListItem>
                <ListItemIcon><i className='route'></i></ListItemIcon>
                <ListItemText primary="Route" />
            </ListItem>
            <ListItem>
                <ListItemIcon><i className='warning'></i></ListItemIcon>
                <ListItemText primary="NavTex" />
            </ListItem>
            <ListItem>
                <ListItemIcon><i className='current-position'></i></ListItemIcon>
                <ListItemText primary="Current position" />
            </ListItem>
        </List>
    );

    const panelContainer = L.DomUtil.create("div", "map-sidebar-legend");
    panelContainer.innerHTML = legendList;

    const infoContent = {
        id: 'infosidebarpanel',
        tab: 'i', // ReactDOMServer.renderToString(<InfoIcon />),
        pane: 'IIIIIIIIIIIIIIII', // panelContainer.innerHTML,
        title: 'Info',
        position: 'top'
    };

    return infoContent

}