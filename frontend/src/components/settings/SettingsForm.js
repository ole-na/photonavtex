import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import WarningCategorySetting from "./WarningCategorySetting";
import RouteSetting from "./route/RouteSetting";
import DistanceSetting from "./DistanceSetting";
import {makeStyles} from "@material-ui/core/styles";

const useSettingsStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        border: '1px solid #000',
        borderRadius: '4px',
        padding: '20px',
        marginBottom: '2em',
        width: '100%',
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    },
    fieldsetLegend: {
        fontWeight: 'bold',
    },
}))

export default function SettingsForm(props) {
    const settingClasses = useSettingsStyles()
    const settings = props.settings;

    const [state, setState] = useState({
        settings: props.settings
    })
    const handleSubmit = event => {
        event.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit}>
            <WarningCategorySetting settings={settings} warningCategory={settings.warningCategory} settingClasses={settingClasses} />
            <DistanceSetting settings={settings} distance={settings.distance} settingClasses={settingClasses} />
            <RouteSetting settings={settings} route={settings.route} settingClasses={settingClasses} />

            <Button variant="contained" color="primary" type="submit">Save</Button>
        </form>
    )
}
