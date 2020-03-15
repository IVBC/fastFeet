import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignUp';

import DeliveryList from '~/pages/Deliveries/DeliveryList';
import DeliveryForm from '~/pages/Deliveries/DeliveryForm';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/deliveries" exact component={DeliveryList} isPrivate />
      <Route path="/deliveries/edit/:id" component={DeliveryForm} isPrivate />
      <Route path="/deliveries/new" component={DeliveryForm} isPrivate />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
