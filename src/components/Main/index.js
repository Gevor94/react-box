import React from 'react';
import ReactDOM from 'react-dom';
import DocumentsList from './DocumentsList';
import Topbar from './Topbar';
import {Button} from 'react-bootstrap';
import './styles.css';

class Main extends React.Component {
    render() {
        let docs = ['doc1','doc2','doc3'];
        return (
                <div id="main-page">
                   <Topbar name="Gevorg"/>
                   <DocumentsList documents = {docs}/>
                </div>
               );
    }
}

export default Main;
