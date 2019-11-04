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

function Pockets({ intl, history }) {
  const [{ index, caller }, setAsset] = useState({ index: 0, caller: '' });

  useEffect(() => {
    const isCallerTop = caller === 'top';
    const pairIndexToFind = isCallerTop ? 1 : 0;
    const pairIndex = isCallerTop ? 0 : 1;
    const nextIndex = positions.find(pair => index === pair[pairIndexToFind])![
      pairIndex
    ];
    const topIndex = isCallerTop ? index : nextIndex;
    const mainIndex = isCallerTop ? nextIndex : index;
    console.log({ index, topIndex, mainIndex, nextIndex, caller });

    mainSlider.current!.slickGoTo(topIndex);
    topSlider.current!.slickGoTo(mainIndex);
    // if (isCallerTop) {
    // } else {
    // }
  }, [index, caller]);

  const [topSlider, mainSlider] = [
    useRef<SliderMethods>(null),
    useRef<SliderMethods>(null),
  ];
  /*
  1 2
  0

  2 0
  1

  0 1
  2
*/
  const positions = [[0, 2], [1, 0], [2, 1]];
  // const positions = [[0, 1], [1, 2], [2, 0]];

  const topSliderSettings = {
    slidesToShow: 2,
    initialSlide: 1,
    dots: false,
  };

  const pockets = [
    {
      key: 'eur',
      description: intl.formatMessage(messages.description),
      value: 102.05,
    },
    {
      key: 'gbp',
      description: intl.formatMessage(messages.description),
      value: 8.15,
    },
    {
      key: 'usd',
      description: intl.formatMessage(messages.description),
      value: 1023.35,
    },
  ];

  function toExchange() {
    history.push('/exchange');
  }

  function afterTopChange(index: number) {
    // mainSlider.current!.slickGoTo(index - 1);
    if (!caller || caller !== 'top') {
      console.log('top', index);
      setAsset({ index, caller: 'top' });
    }
  }

  function afterMainChange(index: number) {
    // topSlider.current!.slickGoTo(index + 1);
    if (!caller || caller !== 'main') {
      console.log('main', index);
      setAsset({ index, caller: 'main' });
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
            afterChange={afterTopChange}
            refToUse={topSlider}
          >
            {pockets.map(item => (
              <CurrencyInfo key={item.key} currency={item} isTop={true} />
            ))}
          </Slider>
        </SliderContainer>
        <SliderContainer isTop={false}>
          <Slider refToUse={mainSlider} afterChange={afterMainChange}>
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
