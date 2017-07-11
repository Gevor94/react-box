import Constants from '../Constants';

var requestManager = {
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
    }
}

export default requestManager;
