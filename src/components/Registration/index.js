import React from 'react';
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
            nameIsEmpty: true,
            nameIsPristine: false,
            surnameIsEmpty: true,
            surnameIsPristine: false,
            emailIsEmpty: true,
            emailIsPristine: false,
            emailHasError: false,
            emailIsBusy: false,
            passwordIsEmpty: true,
            passwordIsPristine: false,
            confPasswordIsEmpty: true,
            confPasswordIsPristine: false,
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
                this.setState({
                    emailIsBusy: true
                });
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
                break;
            case 'btn_cancel':
                this.props.history.goBack();
                console.log('cancel');
                break;
            default:
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
            name: event.target.value,
            nameIsPristine: true
        }, function() {
            this.checkName();
        });
    }

    handleSurnameInput(event) {
        this.setState({
            surname: event.target.value,
            surnameIsPristine: true
        }, function() {
            this.checkSurname();
        });
    }

    handleEmailInput(event) {
        this.setState({
            email: event.target.value,
            emailIsPristine: true
        }, function() {
            this.checkEmail();
        });
        if (this.state.emailIsBusy) {
            this.setState({
                emailIsBusy: false
            });
        }
    }

    handlePasswordInput(event) {
        this.setState({
            password: event.target.value,
            passwordIsPristine: true
        }, function() {
            this.checkPassword();
        });
    }

    handleConfirmPasswordInput(event) {
        this.setState({
            confPassword: event.target.value,
            confPasswordIsPristine: true
        }, function() {
            this.checkConfPassword();
        });
    }

    render() {
      let isDisabled = false;
      if (this.state.nameIsEmpty || this.state.surnameIsEmpty || 
          this.state.passwordIsEmpty || this.state.passwordIsEmpty ||
          this.state.confPasswordIsEmpty) {
               isDisabled = true;
          }
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
                      placeholder="Name"
                      onChange = {this.handleNameInput}/>
                    <ControlLabel className="field-error"> {this.state.nameIsEmpty && this.state.nameIsPristine ? "Name field can't be empty" : null} </ControlLabel>
                  </div>
                  <div className="register-block">
                    <FormControl
                      className="register-control"
                      placeholder="Surname"
                      onChange = {this.handleSurnameInput}/>
                    <ControlLabel className="field-error"> {this.state.surnameIsEmpty && this.state.surnameIsPristine ? "Surname field can't be empty" : null} </ControlLabel>
                  </div>
                  <div className="register-block">
                    <FormControl
                      type="email"
                      className="register-control"
                      placeholder="Email"
                      onChange={this.handleEmailInput}/>
                    <ControlLabel className="field-error"> {this.state.emailIsEmpty && this.state.emailIsPristine ? "Email field can't be empty" : null} </ControlLabel>
                    <ControlLabel className="field-error"> {this.state.emailHasError ? "Email is invalid" : null} </ControlLabel>
                    <ControlLabel className="field-error"> {this.state.emailIsBusy ? "This email is already in use, try another one" : null} </ControlLabel>
                 </div>
                 <div className="register-block">
                    <FormControl
                      type="password"
                      className="register-control"
                      placeholder="Password"
                      onChange={this.handlePasswordInput}/>
                    <ControlLabel className="field-error"> {this.state.passwordIsEmpty && this.state.passwordIsPristine ? "Password can't be empty" : null} </ControlLabel>
                 </div>
                 <div className="register-block">
                    <FormControl
                      type="password"
                      className="register-control"
                      placeholder="Re-enter password"
                      onChange={this.handleConfirmPasswordInput}/>
                    <ControlLabel className="field-error"> {this.state.confPasswordIsEmpty && this.state.confPasswordIsPristine ? "Re-enter password field can't be empty" : null} </ControlLabel>
                    <ControlLabel className="field-error"> {this.state.confPasswordHasError ? "Password and re-entered password is different" : null} </ControlLabel>
                 </div>
                </div>
                <div>
                    <Button id="btn_sign_up" disabled={isDisabled} bsStyle="primary" type="submit" className="btn-register" onClick={this.clickHandler}>Sign Up</Button>
                    <Button id="btn_cancel" type="submit" className="btn-register" onClick={this.clickHandler}>Cancel</Button>
                </div>
            </div>
          </div>
      );
    }
}

export default Registration;

