import React from "react";
import {useState} from "react";
import {useHistory} from "react-router-dom";

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {Link} from "@material-ui/core";

import SettingsIcon from '@material-ui/icons/Settings';
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';
import HelpIcon from '@material-ui/icons/Help';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

import {makeStyles} from "@material-ui/core/styles";
import blue from '@material-ui/core/colors/blue';

const useStyles = makeStyles({
    footer: {
        backgroundColor: blue[300],
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        borderTop: '1px solid ' + blue[100],
    },
    copyright: {
        padding: "0.1rem",
    },
    bottomNaviContainer: {
        justifyContent: "space-around",
    },
});

function LabelBottomNavigation() {
    const [value, setValue] = useState("");
    const history = useHistory();
    const handleChange = (event, newValue) => {
        history.push(newValue);
        setValue(newValue);
    };

    return (
        <BottomNavigation
            value={value}
            onChange={handleChange}
            showLabels
        >
            <BottomNavigationAction label="Settings" value="/settings" icon={<SettingsIcon />} />
            <BottomNavigationAction label="Upload" value="/upload" icon={<AddAPhotoIcon />} />
            <BottomNavigationAction label="Warnings" value="/warnings" icon={<SettingsInputAntennaIcon />} />
            <BottomNavigationAction label="Map" value="/map" icon={<LocationOnIcon />} />
            <BottomNavigationAction label="Help" value="/help" icon={<HelpIcon />} />
        </BottomNavigation>
    );
}

export default function Footer() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <LabelBottomNavigation classes={classes.bottomNaviContainer} />
            <Container className={classes.copyright}>
                <Typography variant="body2" color="textSecondary" align="center">
                    {"Copyright © "}
                    <Link color="inherit" href="/">
                        PhotoNavTex
                    </Link>{" "}
                    {new Date().getFullYear()}
                </Typography>
            </Container>
        </footer>
    );
}
