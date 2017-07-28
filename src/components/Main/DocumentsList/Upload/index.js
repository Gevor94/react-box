import React from 'react';
import RequestManager from '../../../../ApiManager/RequestManager';
import {Glyphicon} from 'react-bootstrap';
import './styles.css';


class FileUploader extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            sizeError: false
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.target.elements.file.files[0].size <= 10000000) {
            this.setState({
                sizeError: false
            });
            RequestManager.uploadFile(event.target, this.props.uploadFileCallback);
        } else {
            this.setState({
                sizeError: true
            });
        }
    }

    render() {
        return (
            <form id="upload"
                  onSubmit={this.handleSubmit}
                  encType="multipart/form-data">
                <input type="file"
                       name="file"
                       accept="text/html, text/plain, application/pdf"/>
                <input id="upl_btn"
                       type='submit'
                       value='Upload' />
                {this.state.sizeError ? <span id="size-error"><Glyphicon glyph="remove-circle"></Glyphicon>
                       File was rejected because it is bigger than 100mb
                       </span>: null}
            </form>

        );
    }
}

export default FileUploader;
