import React from "react";
import Button from "@material-ui/core/Button";
import WarningCategorySetting from "./WarningCategorySetting";
import RouteSetting from "./route/RouteSetting";
import DistanceSetting from "./DistanceSetting";

export default function SettingsForm(props) {
    return (
        <form onSubmit={(event) => {props.handleSubmit(event)}}>
            <WarningCategorySetting settings={props.settings} setSettings={props.setSettings} />
            <DistanceSetting settings={props.settings} setSettings={props.setSettings} />
            <RouteSetting settings={props.settings} setSettings={props.setSettings} />
            <Button variant="contained" color="primary" type="submit">Save</Button>
        </form>
    )
}
