import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import routes from './routeConfig';

import ValidationControl from './routes/validationControl';

export default class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { store } = this.props;
    return (
      <Router>
        <Route
          render={props => (
            <ValidationControl {...props} routes={routes} store={store}>
              <div className="router">
                <div className="route">{renderRoutes(routes)}</div>
              </div>
            </ValidationControl>
          )}
        />
      </Router>
    );
  }
}
