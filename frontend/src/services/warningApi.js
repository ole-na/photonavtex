import axios from 'axios'

export const getWarnings = () =>
    axios
        .get('api/warnings')
        .then((response) => response.data)
        .catch((error) => console.error(error.message));

export const postWarning = (newWarningDto) =>
    axios
        .post('api/warning', newWarningDto)
        .then((response) => response.data)
        .catch((error) => console.error(error.message));

export const deleteWarning = (warning) =>
    axios
        .delete('api/warning/' + warning.id)
        .catch((error) => console.error(error.message));

export const getWarning = (id) =>
    axios
        .get(`/api/warning/${id}`).then((response) => response.data)
        .catch((error) => console.error(error.message));

// if route was changed => min distance from route should be updated
// optional (extended feature): update of warning via new warning to the saved warning
export const putWarning = (warning) =>
    axios
        .put('api/warning/' + warning.id, warning)
        .then((response) => response.data)
        .catch((error) => console.error(error.message));

export const getNewWarning = () =>
    axios
        .get(`/api/warning/new`).then((response) => response.data)
        .catch((error) => console.error(error.message));
