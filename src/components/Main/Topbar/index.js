import React from 'react';
import {Navbar, Nav, FormGroup, FormControl, Button, NavDropdown, MenuItem} from 'react-bootstrap';
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
                window.localStorage.clear();
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
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#" onClick={this.props.homeClickCallback}>Project Name</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Form pullLeft>
                        <FormGroup >
                            <FormControl type="text" placeholder="Search" onChange={(props)=>{
                                this.searchquery = props.target.value;
                            }
                            }/>
                        </FormGroup>
                        {' '}
                        <Button type="submit" onClick={(props) => {this.props.searchQuerySubmitCallback(this.searchquery)}}>Search</Button>
                    </Navbar.Form>
                    <Nav pullRight>
                        <NavDropdown title={this.props.name} id="basic-nav-dropdown">
                            <MenuItem id="sign_out" onClick={this.handleEvents}>Sign out</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Topbar;

