import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Main from './components/Main';
import Login from './components/Login';
import Registration from './components/Registration';

const Routes = (props) => (
  <BrowserRouter {...props}>
    <div>
      <Route exact path="/" component={Registration} />
      <Route path="/Login" component={Login} />
      <Route path="/Registration" component={Registration} />
    </div>
  </BrowserRouter>
);

export default Routes;
