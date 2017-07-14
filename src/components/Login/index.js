import React from 'react';
import {Button, Popover} from 'react-bootstrap';
import RequestManager from '../../ApiManager/RequestManager'
import {Redirect} from 'react-router';
import './style.css'

class Login extends React.Component {
    constructor() {
        super();
        this.clickHandler = this.clickHandler.bind(this);
        this.state = {
            success: false,
            hasError: false,
            redirectTo: false
        };
    }

    clickHandler(props) {
        let cb = (response) => {
            if(response.success) {
                this.token = response.token;
                this.name = response.name;
                this.surname = response.surname;
                this.setState ({
                    success:true,
                    hasError: false,
                    redirectTo: '/Main'
                });
            } else {
                this.setState ({
                    hasError:true
                });
            }
        };
        switch(props.target.id) {
            case 'btn_sign_in':
                let params = {
                    email: this.email.value,
                    password: this.password.value
                };
                RequestManager.makeRequest('login', params, cb, 'POST');
                break;
            case 'btn_register':
                this.setState({
                    redirectTo: '/Registration'
                });
                break;
            case 'forgot':
                console.log('Forgot');
                break;
            default:
                break;
        }
    };

    render() {
        let bsStyle = '',
            popoverClassName = 'hide',
            emailClassName = '',
            positionLeft = 0,
            positionTop = 0;
        this.state.success ? bsStyle = 'success' : bsStyle = 'primary';
        if(this.state.hasError) {
            let emailPosition = this.email.getBoundingClientRect();
            popoverClassName = '';
            emailClassName = 'error';
            positionTop = emailPosition.top - emailPosition.height/2;
            positionLeft = emailPosition.left + emailPosition.width;
        }
        if(this.state.redirectTo) {
            return <Redirect push to={{pathname: this.state.redirectTo,
                token: this.token,
                name: this.name,
                surname: this.surname}}/>
        }
        return (
            <div className="center">
                <div>
                    <span>Email</span>
                    <input id="email" ref={(email) => this.email = email} className={"form-control " + emailClassName} placeholder="Email"/>
                <Popover
                    id="popover-basic"
                    className={popoverClassName}
                    placement="right"
                    positionLeft={positionLeft}
                    positionTop={positionTop}
                    title="">
                        The Email/Password you’ve entered doesn’t match any account.
                </Popover>
                <span>Password</span>
                <input id="password" ref={(password) => this.password = password} type="password" className="form-control" placeholder="Password"/>
                    <div id="buttons">
                        <Button id="btn_sign_in" bsStyle={bsStyle} onClick={this.clickHandler}>Sign In</Button>
                        <Button id="btn_register" bsStyle="primary" onClick={this.clickHandler}>Register</Button>
                        <a id="forgot" onClick={this.clickHandler}>Forgot password?</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
