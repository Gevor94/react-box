import React from 'react';
import {FormControl, NavDropdown, MenuItem} from 'react-bootstrap';
import FileUploader from './Upload'
import {Redirect} from 'react-router';
import './styles.css'

class Topbar extends React.Component {
    constructor() {
        super();
        this.handleEvents = this.handleEvents.bind(this);
        this.state = {
            redirectTo: false
        };
    }

    handleEvents(props) {
        switch(props.target.id) {
            case 'sign_out':
                this.setState({
                    redirectTo: './' 
                });
                break;
            default:
                break;
        }
    }

    render() {
        if(this.state.redirectTo) {
            return <Redirect to={this.state.redirectTo}/>
        }
        return (
                <div id="topbar">
                    <FileUploader uploadFileCallback={this.props.uploadFileCallback}/>
                    <FormControl id="search" type="text" placeholder="Search" onChange={this.handleEvents} />
                    <NavDropdown id="drop" title={this.props.name}>
                        <MenuItem id="sign_out" onClick={this.handleEvents}>Sign out</MenuItem>
                    </NavDropdown>
                </div>
               );
    }
}

export default Topbar;

