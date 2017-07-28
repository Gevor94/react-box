import React from 'react';
import {Navbar, Nav, FormGroup, FormControl, Button, NavDropdown, MenuItem, Glyphicon} from 'react-bootstrap';
import {Redirect} from 'react-router';
import RequestManager from '../../../ApiManager/RequestManager'
import './styles.css'

class Topbar extends React.Component {
    constructor() {
        super();
        this.handleEvents = this.handleEvents.bind(this);
        this.state = {
            redirectTo: false
        };
    }

    handleEvents(props,bookmark) {
        switch(props.target.id) {
            case 'sign_out':
                window.localStorage.clear();
                this.setState({
                    redirectTo: './'
                });
                break;
            case 'open-bookmark':
                window.open('http://localhost:9000/' + props.target.text);
                break;
            case 'remove-icon':
                let bookmarks = [];
                bookmarks = this.props.bookmarks.filter((bookMark) => {
                    return bookmark !== bookMark;
                });
                RequestManager.changeBookmarks(bookmarks, this.props.bookmarkFileCallback);
            default:
                break;
        }
    }


    render() {
        if(this.state.redirectTo) {
            return <Redirect to={this.state.redirectTo}/>
        }
        let bookmarksMenuItem = this.props.bookmarks.map((bookmark, i) => {
            return <MenuItem key={i}
                             className="bookmarks"
                             id="open-bookmark"
                             onClick={(props) => this.handleEvents(props, bookmark)}>
                       {bookmark}
                       <Glyphicon
                           id="remove-icon"
                           className="delete-icon"
                           glyph="remove"
                           onClick={(props) => this.handleEvents(props, bookmark)}>
                       </Glyphicon>
                   </MenuItem>
        });

        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand >
                        <a  id="nav-header"
                            href="#"
                            onClick={this.props.homeClickCallback}>
                            boxIM
                        </a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Form pullLeft>
                        <FormGroup >
                            <FormControl type="text"
                                         placeholder="Search"
                                         onChange={(props)=>{this.searchquery = props.target.value;}}/>
                        </FormGroup>
                        {' '}
                        <Button type="submit"
                                onClick={(props) => {this.props.searchQuerySubmitCallback(this.searchquery)}}>
                            Search
                        </Button>
                    </Navbar.Form>
                    <Nav pullLeft>
                        <NavDropdown title="My bookmarks"
                                     id="basic-nav-dropdown">
                            {bookmarksMenuItem}
                            {this.props.bookmarks.length ? null : <span id="no-bookmarks"> You haven't bookmarks </span>}
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavDropdown title={this.props.name}
                                     id="basic-nav-dropdown">
                            <MenuItem id="sign_out"
                                      onClick={this.handleEvents}>
                                Sign out
                            </MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Topbar;

