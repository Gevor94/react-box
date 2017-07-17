import Constants from '../Constants';

let requestManager = {
    makeRequest: (action, params, callback, method = 'GET') => {
        fetch(Constants.SERVER_URL + action + '?data=' + JSON.stringify(params), {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'access-token': window.localStorage.accessToken
            }
        }).then((response) => {
            return response.json();
        }).then((body) => {
            callback(body);
        });
    },

    uploadFile: (data, callback) => {
        fetch(Constants.SERVER_URL + 'upload', {
            method: 'POST',
            headers: {
                'access-token': window.localStorage.accessToken
            },
            body: new FormData(data)
        }).then((response) => {
            console.log('response', response);
            return response.json();
        }).then((body) => {
            callback(body);
        });
    }
};

export default requestManager;
