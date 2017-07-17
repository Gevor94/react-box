import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Main from './components/Main';
import Login from './components/Login';
import Registration from './components/Registration';
import Uploads from './components/Uploads';

const Routes = (props) => (
  <BrowserRouter {...props}>
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/Registration" component={Registration} />
      <Route path="/Main" component={Main} />
      <Route path="/Uploads/*" component={Uploads} />
    </div>
  </BrowserRouter>
);

export default Routes;
