import React from 'react';
import {Button, Popover} from 'react-bootstrap';
import {BrowserRouter as Router} from 'react-router-dom'
import RequestManager from '../../ApiManager/RequestManager'
import './style.css'

class Login extends React.Component {
  constructor() {
      super();
      this.clickHandler = this.clickHandler.bind(this);
      this.state = {
          success: false,
          hasError: false
      };
  }

  clickHandler(props) {
      let cb = (success) => {
          if(success) {
              this.setState ({
                  success:true,
                  hasError:true
              });
              //TODO route main
          } else {
              this.setState ({
                  hasError:true
              });
          }
      };
      switch(props.target.id) {
            case 'btn_sign_in':
                console.log(this.email.getBoundingClientRect());
                let params = {
                    userName: this.email.value,
                    password: this.password.value
                };
                RequestManager.makeRequest('login', params, cb, 'POST');
				break;
			case 'btn_register':
                //TODO open registration page
                console.log('Register');
				break;
            case 'forgot':
                console.log('Forgot');
                break
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
      return (
    	<div className="center">
    		<div>
    			<span>Email</span>
                    <input id="email" ref={(email) => this.email = email} className={"form-control " + emailClassName}   placeholder="Email"/>
                    <Popover
                        id="popover-basic"
                        className={popoverClassName}
                        placement="right"
                        positionLeft={positionLeft}
                        positionTop={positionTop}
                        title="">
                        The email you’ve entered doesn’t match any account.
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