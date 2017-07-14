import React from 'react';
import ReactDOM from 'react-dom';
import DocumentsList from './DocumentsList';
import Topbar from './Topbar';
import {Button} from 'react-bootstrap';
import './styles.css';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.userDetails = window.sessionStorage.accessToken;
        console.log('userDetails', this.userDetails)
    }

    uploadFileCallback(uploadedFile) {
        //TODO should update list
        console.log('uploadComplated', uploadedFile);
    }

    render() {
        let docs = ['doc1','doc2','doc3'];
        return (
            <div id="main-page">
                <Topbar name="Gevorg" uploadFileCallback={this.uploadFileCallback}/>
                <DocumentsList documents={docs}/>
            </div>
        );
    }
}

export default Main;
