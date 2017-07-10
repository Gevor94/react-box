import React from 'react';
import { Router, Route } from 'react-router'

import Main from './components/Main';
import Login from './components/Login';
import Registration from './components/Registration';

const Routes = (props) => (
  <Router {...props}>
  <Route path="/" component={Main} />
  <Route path="/Login" component={Login} />
  <Route path="/Registration" component={Registration} />
  </Router>
);

export default Routes;
