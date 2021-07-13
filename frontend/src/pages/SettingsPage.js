import React, {useContext, useEffect, useState} from "react";
import SettingsForm from "../components/settings/SettingsForm";
import Loading from "../components/Loading";
import {Alert} from "@material-ui/lab";
import {useParams} from "react-router-dom";
import axios from "axios";
import SuccessDialog from "../components/settings/SuccessDialog";
import TypeAndAuthContext from "../components/login/context/TypeAndAuthContext";

export default function SettingsPage() {
    let {username} = useParams();

    const defaultSettings = {
        id: "",
        category: ["A", "D"],
        distance: 15,
        route: {
            start: [],
            end: [],
            points: [],
        }
    }

    const { SETTINGS } = useContext(TypeAndAuthContext);
    // const [settings, setSettings] = useState(defaultSettings)
    const [settings, setSettings] = useState(SETTINGS)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [openSuccessDialog, setOpenSuccesDialog] = useState(false);

    const {token} = useContext(TypeAndAuthContext);
    const config = {
        headers: {
            Authorization: "Bearer " + token,
        },
    };

    const getSettingsFromRepositoryOrUseDefaultSettings = () => {
        setIsLoading(true);
        axios
            .get(`/api/settings`, config)
            .then((response) => response.data)
            .then((settingsResponse) => {
                if(!settingsResponse) {
                    setSettings(defaultSettings)
                    setIsLoading(false);
                    return
                }
                setSettings(settingsResponse)
                setError(false);
            })
            .catch((error) => {
                console.error(error.message)
                setError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        getSettingsFromRepositoryOrUseDefaultSettings()
    },[]);

    function changeRouteInputStringToCoordsArray(inputValue) {
        const coords = inputValue.split(", ")
        const lat = parseFloat(coords[0].trim())
        const long = parseFloat(coords[1].trim())
        return [lat, long]
    }

    const saveSettingsIntoRepository = (settingsToSaved) => {
        axios
            .post('/api/settings', settingsToSaved, config)
            .then((response) => response.data)
            .then((newSettings) => {
                const updatedSettings = {...settings, newSettings}
                setSettings(updatedSettings)
                setError(false);
                setOpenSuccesDialog(true)
            })
            .catch((error) => {
                console.error(error.message)
                setError(true);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const prepareSettingsDataForPostRequest = () => {
        const routeStartArray = settings.route.start
        const routeEndArray = settings.route.end
        let routePointsArray = []

        settings.route.points?.map((point, index) => {
            const pointCoords = point
            routePointsArray.push(pointCoords)
        })

        const settingsToSaved = {...settings, route: {
                start: routeStartArray,
                end: routeEndArray,
                points: routePointsArray,
            }}
        return settingsToSaved
    }

    function handleSubmit(event){
        event.preventDefault()
        setIsLoading(true);
        const settingsToSaved = prepareSettingsDataForPostRequest()
        saveSettingsIntoRepository(settingsToSaved)
    }

    return (
        <div className="page-content-container">
            <h2>Settings</h2>
            <p>
                Please define or update your warning category(ies), distance from the route and route coordinates here.
            </p>

            {isLoading && <Loading isLoading={isLoading}/>}

            {!isLoading && error && <Alert className="margin-bottom-m" severity="error">Oh no, something went wrong!</Alert>}

            {!isLoading && settings && <SettingsForm settings={settings} setSettings={setSettings} handleSubmit={(event) => {handleSubmit(event)}}/>}

            <SuccessDialog openSuccessDialog={openSuccessDialog} setOpenSuccesDialog={setOpenSuccesDialog} />
        </div>
    )
}
