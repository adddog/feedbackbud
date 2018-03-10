import React from 'react';
import AppContainer from 'containers/AppContainer';
import FeedContainer from 'containers/FeedContainer';
import WebRTCComponent from "components/WebRTC/WebRTC"

import { Route, Switch, Redirect } from 'react-router';

export const ROUTES = {
  root: {
    slug: '/'
  },
  feed: {
    base: '/feed',
    slug: '/feed'
  },
};
export default function configureRoutes() {
  return (
    <Switch>
      <Route
        exact
        path={`${ROUTES.root.slug}`}
        component={AppContainer}
      />
      <Route
        path={`${ROUTES.feed.slug}`}
        component={WebRTCComponent}
      />
    </Switch>
  );
}
