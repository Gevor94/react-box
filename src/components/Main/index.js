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
        this.responseCallback = (response) => {
            if(response.success) {
                this.setState({
                    items: response.files
                });
                switch (response.action) {
                    case 'getAllFiles':
                        if(this.state.searchedFiles) {
                            this.setState({
                                searchedFiles: false
                            });
                        }
                        break;
                    case 'search':
                        if (!this.state.searchedFiles) {
                            this.setState({
                                searchedFiles: true
                            });
                        }
                        break;
                }
            } else {
                //TODO show error 'Please login first.'
            }
        };
        this.state = {
            items: [],
            searchedFiles: false
        }
    }

    componentWillMount() {
        RequestManager.makeRequest('getAllFiles', false, _this.responseCallback);
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

    deletedFileCallback(response) {
        if(response.success) {
            let items = _this.state.items;
            items = items.filter((item) => {
                return item.id !== response.file.id;
            });
            _this.setState({
                items: items
            });
        } else {
            //TODO show error
        }
    }


    handleHomeClick() {
        RequestManager.makeRequest('getAllFiles', false, _this.responseCallback);
    }

    handleSearchQuerySubmit(searchQuery) {
        const params = {
            searchQuery: searchQuery
        };
        if (searchQuery) {
            RequestManager.makeRequest('search', params, _this.responseCallback);
        } else {
            RequestManager.makeRequest('getAllFiles', false, _this.responseCallback);
        }
    }

    render() {
        let userName = window.localStorage.name + ' ' + window.localStorage.surname;
        return (
            <div id="main-page">
                <Topbar name={userName} homeClickCallback={this.handleHomeClick}  searchQuerySubmitCallback={this.handleSearchQuerySubmit}/>
                <DocumentsList documents={this.state.items} searchedFiles={this.state.searchedFiles}
                               uploadFileCallback={this.uploadFileCallback} deletedFileCallback={this.deletedFileCallback}/>
            </div>
        );
    }
}

export default Main;
