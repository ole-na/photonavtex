import React, {useState} from "react";
// import { getSettings } from '../services/settingsApi'
import SettingsForm from "../components/settings/SettingsForm";

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        warningCategory: "",
        distance: "",
        route: {
            start: "",
            end: "",
            points: []
        }
    })

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // const resp = await getSettings();
            // setSettings(resp);
            setIsLoading(false);
        } catch (e) {
            setError(e);
            setIsLoading(false);
        }
    };

    return (
        <section>
            <h2>Settings</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
            </p>

            {isLoading && <p>Loading...</p>}

            {!isLoading && error ? (
                <p>Oh no something went wrong!</p>

            ) : null}

            {settings ? <SettingsForm settings={settings} /> : null}

            {!settings && !isLoading ? <div>No settings data yet</div> : null}

        </section>
    );
}
