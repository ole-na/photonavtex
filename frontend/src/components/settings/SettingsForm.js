import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import WarningCategorySetting from "./WarningCategorySetting";
import RouteSetting from "./route/RouteSetting";
import DistanceSetting from "./DistanceSetting";

export default function SettingsForm(props) {
    const settings = props.settings;

    const [state, setState] = useState({
        settings: props.settings
    })

    const handleSubmit = event => {
        event.preventDefault()
    }

    return (
        <form onSubmit={(event) => {handleSubmit(event)}}>
            <WarningCategorySetting settings={settings} warningCategory={settings.warningCategory} />
            <DistanceSetting settings={settings} distance={settings.distance} />
            <RouteSetting settings={settings} route={settings.route} />
            <Button variant="contained" color="primary" type="submit">Save</Button>
        </form>
    )
}
