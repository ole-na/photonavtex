function onSuccess(position) {
    const currentCoords = position.coords;
    const latitude  = currentCoords.latitude;
    const longitude = currentCoords.longitude;

    const mapUrl = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    const text = `Latitude: ${latitude} °, Longitude: ${longitude} °`;

    console.log("Map Link Href" + mapUrl);
    console.log("Map Link Text" + text);

    const currentState = {
        hasLocation: true,
        coords: currentCoords,
        text: text,
        url: mapUrl
    }

    return currentState;
}

function error(errorText) {
    console.error(errorText);
    const currentStateError = {
        hasLocation: false,
        coords: [],
        text: errorText,
        url: ""
    }

    return currentStateError;
}

function onError(error) {
    console.error("Current Position Error. Code: " + error.code + ". Message: " + error.message);

    let errorText = "Unable to retrieve your location.";
    switch(error.code) {
        case error.PERMISSION_DENIED:
            errorText = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            errorText = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            errorText = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERR:
            errorText = "An unknown error occurred."
            break;
    }
    return "Error: " + errorText;
}

// device APIs are available
function onGeolocationExist() {
    console.log("Geolocation is available. Locating...");
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 60000
    });
}

export default function getGeoCurrentPosition() {
    if(!navigator.geolocation) {
        const errorText = "Geolocation is NOT supported by this browser";
        error(errorText);
    } else {
        // wait for geolocation API object to load
        document.addEventListener("navigator.geolocation", onGeolocationExist, false);
    }
}