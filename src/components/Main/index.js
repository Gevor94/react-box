import React from 'react';
import DocumentsList from './DocumentsList';
import Topbar from './Topbar';
import RequestManager from '../../ApiManager/RequestManager'
import {Redirect} from 'react-router';
import './styles.css';

let _this;

class Main extends React.Component {
    constructor(props) {
        super(props);
        _this = this;
        this.userDetails = window.sessionStorage.accessToken;
        this.responseCallback = (response) => {
            if(response.success) {
                switch (response.action) {
                    case 'getAllFiles':
                        this.setState({
                            items: response.files
                        });
                        if(this.state.searchedFiles) {
                            this.setState({
                                searchedFiles: false
                            });
                        }
                        break;
                    case 'search':
                        this.setState({
                            items: response.files
                        });
                        if (!this.state.searchedFiles) {
                            this.setState({
                                searchedFiles: true
                            });
                        }
                        break;
                    case 'getUserBookmarks':
                        let bookmarks = [],
                            files;
                        if(response.files && response.files[0].bookmarks) {
                            files = response.files[0].bookmarks.split('\n');
                            for (let i = 0, len = files.length; i < len; ++i) {
                                    bookmarks.push(files[i]);
                            }
                            this.setState({
                                bookmarks: bookmarks
                            });
                        }
                        break;
                }
            } else {
                this.props.history.push('/');
            }
        };
        this.state = {
            items: [],
            searchedFiles: false,
            bookmarks: []
        }
    }

    componentWillMount() {
        let cb = (response) => {
            if (response.success) {
                this.responseCallback(response);
                RequestManager.makeRequest('getUserBookmarks', false, _this.responseCallback);
            } else {
                this.props.history.push('/');
            }
        };
        RequestManager.makeRequest('getAllFiles', false, cb);

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

    bookmarkFileCallback(response) {
        if(response.success) {
            let bookmarks;
            bookmarks = response.file;
            _this.setState({
                bookmarks: bookmarks
            });
        } else {
            //TODO show error
        }
        return;
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
                <Topbar name={userName} homeClickCallback={this.handleHomeClick}
                        searchQuerySubmitCallback={this.handleSearchQuerySubmit}
                        bookmarkFileCallback={this.bookmarkFileCallback}
                        bookmarks={this.state.bookmarks}/>
                <DocumentsList documents={this.state.items} bookmarks={this.state.bookmarks}
                               searchedFiles={this.state.searchedFiles}
                               deletedFileCallback={this.deletedFileCallback}
                               bookmarkFileCallback={this.bookmarkFileCallback}
                               uploadFileCallback={this.uploadFileCallback} />
            </div>
        );
    }
}

export default Main;
