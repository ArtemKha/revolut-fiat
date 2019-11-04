import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { TransactionOutline } from '@ant-design/icons';
import { Control, SliderContainer, ControlIcon, ControlLabel } from './styled';
import Slider from 'components/Slider';
import Background from 'components/Background';
import Footer from './Footer';
import CurrencyInfo from './CurrencyInfo';
import { Icon } from 'components/Icon';
import messages from './messages';
import { SliderMethods } from 'containers/Exchange/types';

const pockets = [
  {
    key: 'eur',
    value: 102.05,
  },
  {
    key: 'gbp',
    value: 8.15,
  },
  {
    key: 'usd',
    value: 1023.35,
  },
];

function Pockets({ intl, history }) {
  const [lastCaller, setLastCaller] = useState('');

  const [topSlider, mainSlider] = [
    useRef<SliderMethods>(null),
    useRef<SliderMethods>(null),
  ];

  const topSliderSettings = {
    slidesToShow: 2,
    initialSlide: 1,
    dots: false,
  };

  function toExchange() {
    history.push('/exchange');
  }

  function getSlickMethod([prev, next]) {
    const isLastBackMove = next === pockets.length - 1 && prev === 0;
    const isLastNextMove = prev === pockets.length - 1 && next === 0;
    return (!isLastBackMove && prev < next) || isLastNextMove
      ? 'slickNext'
      : 'slickPrev';
  }

  function updateSlider(indexes, caller) {
    const method = getSlickMethod(indexes);

    setLastCaller(caller);

    if (caller === 'top') {
      mainSlider.current![method]();
    } else {
      topSlider.current![method]();
    }

    setLastCaller('');
  }

  function beforeTopChange(...indexes) {
    if (!lastCaller || lastCaller !== 'main') {
      updateSlider(indexes, 'top');
    }
  }

  function beforeMainChange(...indexes) {
    if (!lastCaller || lastCaller !== 'top') {
      updateSlider(indexes, 'main');
    }
  }

  return (
    <>
      <Helmet>
        <title>{intl.formatMessage(messages.pockets)}</title>
        <meta
          name="description"
          content={intl.formatMessage(messages.pockets)}
        />
      </Helmet>
      <Background>
        <SliderContainer isTop={true}>
          <Slider
            {...topSliderSettings}
            beforeChange={beforeTopChange}
            refToUse={topSlider}
          >
            {pockets.map(item => (
              <CurrencyInfo key={item.key} currency={item} isTop={true} />
            ))}
          </Slider>
        </SliderContainer>
        <SliderContainer isTop={false}>
          <Slider refToUse={mainSlider} beforeChange={beforeMainChange}>
            {pockets.map(item => (
              <CurrencyInfo key={item.key} currency={item} />
            ))}
          </Slider>
        </SliderContainer>
        <Footer>
          <Control onClick={toExchange}>
            <ControlIcon>
              <Icon icon={TransactionOutline} />
            </ControlIcon>
            <ControlLabel>
              <FormattedMessage {...messages.exchange} />
            </ControlLabel>
          </Control>
        </Footer>
      </Background>
    </>
  );
}

export default injectIntl(Pockets);
