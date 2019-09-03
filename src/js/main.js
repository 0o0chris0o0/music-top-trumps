// React
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

// Redux store
import configureStore from './store/configureStore';
const store = configureStore();

// main styles
import '../styles/index.scss';

// Container component
import Container from './Container';

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component store={store} />
      </AppContainer>
    </Provider>,
    document.getElementById('app')
  );
};

render(Container);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./Container', () => {
    const NextApp = require('./Container').default;
    render(NextApp);
  });
}
