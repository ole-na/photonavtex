import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';
import HelpIcon from '@material-ui/icons/Help';
import InfoIcon from '@material-ui/icons/Info';
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

export default function DynamicIcon({type}) {
    switch (type) {
        case 'settings':
            return <SettingsIcon color="primary" aria-hidden="true"/>;
        case 'map':
            return <LocationOnIcon color="primary" aria-hidden="true"/>;
        case 'warnings':
            return <SettingsInputAntennaIcon color="primary" aria-hidden="true"/>;
        case 'help':
            return <HelpIcon color="primary" aria-hidden="true"/>;
        case 'about':
            return <InfoIcon color="primary" aria-hidden="true"/>;
        case 'upload':
            return <AddAPhotoIcon color="primary" aria-hidden="true"/>;
        case 'login':
            return <AccountCircleIcon color="primary" aria-hidden="true"/>;
        default:
            return null;
    }
}
