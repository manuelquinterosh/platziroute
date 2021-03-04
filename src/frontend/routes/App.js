import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../Home';
import Login from '../Login';
import Register from '../Register';
import NotFound from '../NotFound';
import Player from '../Player';
import Layout from '../components/Layout';

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/player/:id' component={Player} />
        <Route component={NotFound} />
      </Switch>
    </Layout>

  </BrowserRouter>
);

export default App;
