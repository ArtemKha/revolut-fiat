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

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <>
      <Helmet titleTemplate="%s - Ex." defaultTitle="Fiat money exchange">
        <meta name="description" content="A React.js Boilerplate application" />
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
