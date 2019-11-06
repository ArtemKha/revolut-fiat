import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import Pockets from 'containers/Pockets';
import Exchange from 'containers/Exchange';
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
          <Route path="" component={NotFoundPage} />
        </Switch>
      </Background>
      <GlobalStyle />
    </>
  );
}
