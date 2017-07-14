import Constants from '../Constants';

let requestManager = {
    makeRequest: (action, params, callback, method = 'GET') => {
        fetch(Constants.SERVER_URL + action + '?data=' + JSON.stringify(params), {
            method: method,
            headers: {'Content-Type':'application/json'}
        }).then((response) => {
            return response.json();
        }).then((body) => {
            callback(body);
            console.log(body);
        });
    },

    uploadFile: (data, callback) => {
        fetch(Constants.SERVER_URL + 'upload', {
            method: 'POST',
            body: new FormData(data)
        }).then((response) => {
            return response.json();
        }).then((body) => {
            callback(body);
        });
    }
}

export default requestManager;
