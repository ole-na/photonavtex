import axios from 'axios'

export const getSettings = () =>
    axios
        .get('api/settings')
        .then((response) => response.data)
        .catch((error) => console.error(error.message));

export const putSettings = (settings) =>
    axios
        .put('api/settings/' + settings)
        .then((response) => response.data)
        .catch((error) => console.error(error.message));

