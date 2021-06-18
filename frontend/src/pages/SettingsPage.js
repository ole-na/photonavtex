import React from "react";
import Button from "@material-ui/core/Button";
import TypeWarningSetting from "../components/settings/TypeWarningSetting";

export default function SettingsPage() {
    return (
        <section>
            <h2>Settings</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
            </p>
            <form>
                <TypeWarningSetting />
                <Button variant="contained" color="primary" type="submit" >Save</Button>
            </form>
        </section>
    );
}
