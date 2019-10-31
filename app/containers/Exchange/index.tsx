import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
// import { useDispatch, useSelector } from 'react-redux';
// import { createStructuredSelector } from 'reselect';

// import { useInjectReducer } from 'utils/injectReducer';
// import { useInjectSaga } from 'utils/injectSaga';
// import { makeSelectError, makeSelectLoading, makeSelectRepos } from 'containers/App/selectors';
// import H2 from 'components/H2';
// import ReposList from 'components/ReposList';
// import AtPrefix from './AtPrefix';
// import CenteredSection from './CenteredSection';
// import Form from './Form';
// import Input from './Input';
// import Section from './Section';
// import messages from './messages';
// import { loadRepos } from '../App/actions';
// import { changeUsername } from './actions';
// import { makeSelectUsername } from './selectors';
// import reducer from './reducer';
// import saga from './saga';
import { Text, Centered } from './styled';
import Background from './Background';
import Footer from './Footer';

export default function Exchange() {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Exchange rate" />
      </Helmet>
      <Background>
        <Centered>
          <Text>Fiat</Text>
        </Centered>
        <Footer>
          <Text>Footer</Text>
        </Footer>
      </Background>
    </>
  );
}
