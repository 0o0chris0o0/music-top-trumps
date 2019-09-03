// use this file to define the router configuration
// https://www.npmjs.com/package/react-router-config

import Start from './routes/Start';
import Build from './routes/Build';
import Fight from './routes/Fight';

export const extraSettings = {
  defaultRoute: '/', // route used when a route match isn't found
  spotifyConnectSuccessRoute: '/build-deck' // route to redirect to after successful connect
};

const routes = [
  {
    path: '/',
    exact: true,
    component: Start
  },
  {
    path: '/build-deck',
    exact: true,
    component: Build
  },
  {
    path: '/fight',
    exact: true,
    component: Fight,
    requiresDeck: true
  }
];

export default routes;
