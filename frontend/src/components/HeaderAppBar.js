import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DynamicIcon from "./DynamicIcon";
import Drawer from '@material-ui/core/Drawer';
import Divider from "@material-ui/core/Divider";
import PropTypes from 'prop-types';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import {CssBaseline} from "@material-ui/core";
import logo from '../logo.svg';
import { makeStyles} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const useStyles = makeStyles(theme => ({
    appBar: {
        backgroundColor: blue[700]
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    headerMenu: {
        width: 250,
    },
    headline3: {
        color: "darkgrey",
        paddingLeft: "1em",
        marginBottom: 0,
    }
}));

function HeaderMenuItem({type, text}) {
    const history = useHistory();
    const navigate = () => history.push('/' + type);
    return(
        <MenuItem onClick={navigate}>
            <ListItemIcon className={"header-menu-item-icon" + type}>
                <DynamicIcon type={type} />
            </ListItemIcon>
            <Typography variant="inherit">
                {text}
            </Typography>
        </MenuItem>
    );
}

function ElevationScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });
    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
};

export default function HeaderAppBar(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    };

    return (
        <>
            <CssBaseline />
            <ElevationScroll {...props}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Link to="/home">
                            </Typography>*/}
                            <img src={logo} className="app-logo" alt="logo" />
                        </Link>
                        <IconButton
                            edge="start"
                            onClick={toggleDrawer(true)}
                            color="inherit"
                            aria-label="open menu">
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>

            <Drawer className={classes.headerMenu}
                    open={open}
                    onClose={toggleDrawer(false)}
            >
                <MenuList onClick={toggleDrawer(false)}
                           onKeyDown={toggleDrawer(false)}>
                    <HeaderMenuItem type="settings" text="Settings" />
                    <HeaderMenuItem type="map" text="Map" />
                    <HeaderMenuItem type="warnings" text="My Warnings" />
                    <HeaderMenuItem type="upload" text="Upload" />
                </MenuList>
                <Divider />
                <section>
                    <h3 className={classes.headline3}>Infos</h3>
                    <MenuList
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        <HeaderMenuItem type="help" text="Help" />
                        <HeaderMenuItem type="about" text="About me" />
                    </MenuList>
                </section>
            </Drawer>

        </>
    );
}
