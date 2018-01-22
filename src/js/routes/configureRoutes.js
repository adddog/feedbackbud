import React from 'react';
import AppContainer from 'containers/AppContainer';
import { Route, Switch, Redirect } from 'react-router';

export const ROUTES = {
  root: {
    slug: '/'
  },
};

export default function configureRoutes() {
  return (
    <Switch>
      <Route
        path={`${ROUTES.root.slug}`}
        component={AppContainer}
      />
    </Switch>
  );
}
