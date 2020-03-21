import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import DeliveryList from '~/pages/Deliveries/DeliveryList';
import DeliveryForm from '~/pages/Deliveries/DeliveryForm';

import DelivererList from '~/pages/Deliverers/DelivererList';
import DelivererForm from '~/pages/Deliverers/DelivererForm';

import RecipientList from '~/pages/Recipients/RecipientList';
import RecipientForm from '~/pages/Recipients/RecipientForm';

import Problems from '~/pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/deliveries" exact component={DeliveryList} isPrivate />
      <Route path="/deliveries/edit/:id" component={DeliveryForm} isPrivate />
      <Route path="/deliveries/new" component={DeliveryForm} isPrivate />

      <Route path="/deliverers" exact component={DelivererList} isPrivate />
      <Route path="/deliverers/edit/:id" component={DelivererForm} isPrivate />
      <Route path="/deliverers/new" component={DelivererForm} isPrivate />

      <Route path="/recipients" exact component={RecipientList} isPrivate />
      <Route path="/recipients/edit/:id" component={RecipientForm} isPrivate />
      <Route path="/recipients/new" component={RecipientForm} isPrivate />

      <Route path="/problems" component={Problems} isPrivate />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
