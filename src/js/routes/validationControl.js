import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';

import { extraSettings } from '../routeConfig';
import Loader from '../components/Loader';

export default class ValidationControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canRender: false
    };

    this.enableRender = this.enableRender.bind(this);
  }

  componentWillMount() {
    // validate on first load
    this.validateRoute();
  }

  componentWillReceiveProps(nextProps) {
    // validate when changing routes
    if (this.props.location !== nextProps.location) {
      this.validateRoute();
    }
  }

  routeChecks(route) {
    const { history, store } = this.props;
    const { player } = store.getState();

    if (route.requiresDeck && !player.deck.length) {
      history.push('/');
      return false;
    }

    return true;
  }

  validateRoute() {
    const { history, routes } = this.props;
    // creates an array of route matches
    const branch = matchRoutes(routes, window.location.pathname);

    if (branch.length) {
      // get the target route object
      const route = branch[0].route;
      // check whether the route passes validation checks
      const routePassedChecks = this.routeChecks(route);

      // only send GA event if we passed the route checks
      if (routePassedChecks) {
        console.log(`panel view: ${location.pathname}`);

        this.enableRender();
      } else {
        this.setState({
          canRender: false
        });
      }
    } else {
      // if theres no route match, redirect to first route
      history.push(extraSettings.defaultRoute);
    }
  }

  enableRender() {
    this.setState({
      canRender: true
    });
  }

  render() {
    const { children } = this.props;
    const { canRender } = this.state;

    // This route will render the old location until all
    // validation functions have passed
    return <Route render={() => canRender ? children : <Loader />} />;
  }
}

ValidationControl.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  routes: PropTypes.arrayOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  children: PropTypes.node.isRequired
};
