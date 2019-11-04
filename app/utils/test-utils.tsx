import React from 'react';
import { IntlProvider } from 'react-intl';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { render as rtlRender } from '@testing-library/react';
import configureStore from 'configureStore';
import history from 'utils/history';

export const render = (ui, store = configureStore({}, history)) => ({
  ...rtlRender(
    // tslint:disable-next-line: jsx-wrap-multiline
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>{ui}</ConnectedRouter>
      </IntlProvider>
    </Provider>,
  ),
  store,
});

export default {
  render,
};
