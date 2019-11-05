/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styles/styled-components';
import { Switch, Route } from 'react-router-dom';

import Pockets from 'containers/Pockets';
import Exchange from 'containers/Exchange';
import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Background from 'components/Background';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import GlobalStyle from '../../global-styles';
import { useDispatch } from 'react-redux';
import { loadRates } from './actions';
import reducer from './reducer';
import saga from './saga';

const key = 'global';

export default function App() {
  const dispatch = useDispatch();

  useInjectReducer({ key: key, reducer: reducer });
  useInjectSaga({ key: key, saga: saga });

  React.useEffect(() => {
    dispatch(loadRates());

    return () => {
      // cleanup
    };
  });

  return (
    <>
      <Helmet titleTemplate="%s - Ex." defaultTitle="Fiat money exchange">
        <meta name="description" content="Global exchange" />
      </Helmet>
      <Background>
        <Switch>
          <Route exact path="/" component={Pockets} />
          <Route exact path="/exchange" component={Exchange} />
          <Route exact path="/home" component={HomePage} />
          <Route path="/features" component={FeaturePage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </Background>
      <GlobalStyle />
    </>
  );
}
