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
import { SyncOutline } from '@ant-design/icons';
import { Control, SliderContainer, ControlIcon, ControlLabel } from './styled';
import Slider from 'components/Slider';
import Background from './Background';
import Footer from './Footer';
import CurrencyInfo from './CurrencyInfo';
import { Icon } from 'components/Icon';

export default function Exchange() {
  const topSliderSettings = {
    slidesToShow: 2,
    initialSlide: 1,
    dots: false,
  };

  const values = [
    {
      key: 'eur',
      description: 'Regular fiat money',
      value: 102.05,
    },
    {
      key: 'gbp',
      description: 'Regular fiat money',
      value: 8.15,
    },
    {
      key: 'usd',
      description: 'Regular fiat money',
      value: 1023.35,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Exchange rate" />
      </Helmet>
      <Background>
        <SliderContainer isTop={true}>
          <Slider settings={topSliderSettings}>
            {values.map(item => (
              <CurrencyInfo key={item.key} currency={item} isTop={true} />
            ))}
          </Slider>
        </SliderContainer>
        <SliderContainer isTop={false}>
          <Slider>
            {values.map(item => (
              <CurrencyInfo key={item.key} currency={item} />
            ))}
          </Slider>
        </SliderContainer>
        <Footer>
          <Control>
            <ControlIcon>
              <Icon icon={SyncOutline} />
            </ControlIcon>
            <ControlLabel>Exchange</ControlLabel>
          </Control>
        </Footer>
      </Background>
    </>
  );
}
