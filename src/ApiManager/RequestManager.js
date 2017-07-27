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

    deleteFile: (data, callback) => {
        let file = {
            name: data.name,
            id: data.id
        };
        fetch(Constants.SERVER_URL + 'delete' + '?data=' + JSON.stringify(file), {
            method: 'POST',
            headers: {
                'access-token': window.localStorage.accessToken
            }
        }).then((response) => {
            return response.json();
        }).then((body) => {
            callback(body);
        });
    },

    changeBookmarks: (data, callback) => {
        let bookmarks = [];
        for (let i=0, len=data.length; i < len; ++i ) {
                bookmarks.push(data[i]);
        }
        fetch(Constants.SERVER_URL + 'bookmark' + '?data=' + JSON.stringify(bookmarks), {
            method: 'POST',
            headers: {
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
