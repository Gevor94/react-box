import React from 'react';
import classnames from 'classnames';
import RequestManager from '../../ApiManager/RequestManager';
import {ControlLabel, Button, FormControl} from 'react-bootstrap';
import './style.css'

class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            surname: '',
            email: '',
            password: '',
            confPassword: '',
            nameIsEmpty: false,
            surnameIsEmpty: false,
            emailIsEmpty: false,
            emailHasError: false,
            passwordIsEmpty: false,
            confPasswordIsEmpty: false,
            confPasswordHasError: false

        };
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleSurnameInput = this.handleSurnameInput.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
        this.handleConfirmPasswordInput = this.handleConfirmPasswordInput.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(props) {
        let cb = (success) => {
            if(success) {
                this.props.history.push('/');
            } else {
                console.log('Error message');
                //TODO show error
            }
        };
        switch(props.target.id) {
            case 'btn_sign_up':
                if (this.canBeSubmitted()) {
                    let params = {
                        name: this.state.name,
                        surname: this.state.surname,
                        email: this.state.email,
                        password: this.state.password
                    };
                    RequestManager.makeRequest('register', params, cb, 'POST');
                }
                console.log('sign up');
                break;
            case 'btn_cancel':
                this.props.history.push('/');
                console.log('cancel');
                break;
        }
    }

    canBeSubmitted() {
        if (this.state.nameIsEmpty || this.state.surnameIsEmpty ||
            this.state.emailIsEmpty || this.state.passwordIsEmpty ||
            this.state.confPasswordIsEmpty) {
            return false;
        } else if (this.state.emailHasError || this.state.confPasswordHasError) {
            return false;
        } else {
            return true;
        }
    }

    checkName() {
        if (this.state.name === '') {
            this.setState({
                nameIsEmpty: true
            });
            return false;
        } else {
            this.setState({
                nameIsEmpty: false
            });
            return true;
        }
    }

    checkSurname() {
        if (this.state.surname === '') {
            this.setState({
                surnameIsEmpty: true
            });
            return false;
        } else {
            this.setState({
                surnameIsEmpty: false
            });
            return true;
        }
    }

    checkEmail() {
        const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;
        if (this.state.email === '') {
            this.setState({
                emailIsEmpty: true,
                emailHasError: false
            });
            return false;
        } else {
            this.setState({
                emailIsEmpty: false
            });
        }
        if (!emailPattern.test(this.state.email)) {
            this.setState({
                emailHasError: true
            });
            return false;
        } else {
            this.setState({
                emailHasError: false
            });
            return true;
        }
    }

    checkPassword() {
        const password = this.state.password;
        const confPassword = this.state.confPassword;
        this.setState({
            passwordIsEmpty: password === '' ? true : false
        }, function() {
            if(this.state.confPassword !== '') {
                this.checkConfPassword();
            }
        });
    }

    checkConfPassword() {
        const password = this.state.password;
        const confPassword = this.state.confPassword;
        this.setState({
            confPasswordIsEmpty: confPassword === '' ? true : false
        }, function() {
            if (this.state.password === '') {
                return;
            } else {
                this.setState({
                    confPasswordIsEmpty: confPassword === '' ? true : false,
                    confPasswordHasError: false
                }, function() {
                    if (this.state.confPasswordIsEmpty) {
                        return;
                    } else {
                        this.setState({
                            confPasswordHasError: password !== confPassword ? true : false
                        });
                    }
                });
            }
        });
    }

    handleNameInput(event) {
        this.setState({
            name: event.target.value
        }, function() {
            this.checkName();
        });
    }

    handleSurnameInput(event) {
        this.setState({
            surname: event.target.value
        }, function() {
            this.checkSurname();
        });
    }

    handleEmailInput(event) {
        this.setState({
            email: event.target.value
        }, function() {
            this.checkEmail();
        });
    }

    handlePasswordInput(event) {
        this.setState({
            password: event.target.value
        }, function() {
            this.checkPassword();
        });
    }

    handleConfirmPasswordInput(event) {
        this.setState({
            confPassword: event.target.value
        }, function() {
            this.checkConfPassword();
        });
    }

    render() {
      return (
          <div className="register-main">
            <div className="register-group">
                <div className="page-header">
                  <h2 className="signup-title">Sign Up</h2>
                </div>
                <div>
                  <div className="register-block">
                    <FormControl
                      className="register-control"
                      ref = "name"
                      placeholder="Name"
                      onChange = {this.handleNameInput}/>
                    <ControlLabel className="field-error"> {this.state.nameIsEmpty ? "Name field can't be empty" : null} </ControlLabel>
                  </div>
                  <div className="register-block">
                    <FormControl
                      className="register-control"
                      ref = "surname"
                      placeholder="Surname"
                      onChange = {this.handleSurnameInput}/>
                    <ControlLabel className="field-error"> {this.state.surnameIsEmpty ? "Surname field can't be empty" : null} </ControlLabel>
                  </div>
                  <div className="register-block">
                    <FormControl
                      type="email"
                      className="register-control"
                      ref="email"
                      placeholder="Email"
                      onChange={this.handleEmailInput}/>
                    <ControlLabel className="field-error"> {this.state.emailIsEmpty ? "Email field can't be empty" : null} </ControlLabel>
                    <ControlLabel className="field-error"> {this.state.emailHasError ? "Email is invalid" : null} </ControlLabel>
                 </div>
                 <div className="register-block">
                    <FormControl
                      type="password"
                      className="register-control"
                      placeholder="Password"
                      ref="password"
                      onChange={this.handlePasswordInput}/>
                    <ControlLabel className="field-error"> {this.state.passwordIsEmpty ? "Password can't be empty" : null} </ControlLabel>
                 </div>
                 <div className="register-block">
                    <FormControl
                      type="password"
                      className="register-control"
                      placeholder="Re-enter password"
                      onChange={this.handleConfirmPasswordInput}/>
                    <ControlLabel className="field-error"> {this.state.confPasswordIsEmpty ? "Re-enter password field can't be empty" : null} </ControlLabel>
                    <ControlLabel className="field-error"> {this.state.confPasswordHasError ? "Password and re-entered password is different" : null} </ControlLabel>
                 </div>
                </div>
                <div>
                    <Button id="btn_sign_up" bsStyle="primary" type="submit" className="btn-register" onClick={this.clickHandler}>Sign Up</Button>
                    <Button id="btn_cancel" type="submit" className="btn-register" onClick={this.clickHandler}>Cancel</Button>
                </div>
            </div>
          </div>
      );
    }
}

export default Registration;

