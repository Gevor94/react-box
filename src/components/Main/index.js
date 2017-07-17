import React from 'react';
import DocumentsList from './DocumentsList';
import Topbar from './Topbar';
import RequestManager from '../../ApiManager/RequestManager'
import './styles.css';

let _this;

class Main extends React.Component {
    constructor(props) {
        super(props);
        _this = this;
        this.userDetails = window.sessionStorage.accessToken;
        this.state = {items: []}
    }

    componentWillMount() {
        let callback = (files) => {
            this.setState({
               items: files
            });
        };
        RequestManager.makeRequest('getAllFiles', false, callback);
    }

    uploadFileCallback(response) {
        if(response.success) {
            let items = _this.state.items;
            items.push(response.file);
            _this.setState({
                items: items
            });
        } else {
            //TODO show error
        }
    }

    render() {
        console.log('RENDER');
        return (
            <div id="main-page">
                <Topbar name="Gevorg" uploadFileCallback={this.uploadFileCallback}/>
                <DocumentsList documents={this.state.items}/>
            </div>
        );
    }
}

export default Main;
