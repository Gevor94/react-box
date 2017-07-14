import React from 'react';
import RequestManager from '../../ApiManager/RequestManager'


class FileUploader extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        RequestManager.uploadFile(event.target);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}
                  encType="multipart/form-data">
                <input type="file" name="file" />
                <input type='submit' value='Upload!' />
            </form>

        );
    }
}

export default FileUploader;