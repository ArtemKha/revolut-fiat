import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { SyncOutline } from '@ant-design/icons';
import { CurrencyExchangeTab, Centered } from './styled';
import Slider from 'components/Slider';
import Background from 'components/Background';
// import Footer from './Footer';
import CurrencyInput from './CurrencyInput';
import { Icon } from 'components/Icon';
import Numpad from './Numpad';
import messages from './messages';
import Header from './Header';

function Exchange({ intl }) {
  const topSliderSettings = {
    slidesToShow: 2,
    initialSlide: 1,
    dots: false,
  };

  const pockets = [
    {
      key: 'eur',
      symbol: '€',
      description: intl.formatMessage(messages.have),
      value: 102.05,
    },
    {
      key: 'gbp',
      symbol: '£',
      description: intl.formatMessage(messages.have),
      value: 8.15,
    },
    {
      key: 'usd',
      symbol: '$',
      description: intl.formatMessage(messages.have),
      value: 1023.35,
    },
  ];

  return (
    <>
      <Helmet>
        <title>{intl.formatMessage(messages.exchange)}</title>
        <meta
          name="description"
          content={intl.formatMessage(messages.exchange)}
        />
      </Helmet>
      <Background>
        <Centered>
          <Header />
          <CurrencyExchangeTab>
            <Slider>
              {pockets.map(item => (
                <CurrencyInput key={item.key} currency={item} isTop={true} />
              ))}
            </Slider>
          </CurrencyExchangeTab>
          <CurrencyExchangeTab>
            <Slider>
              {pockets.map(item => (
                <CurrencyInput key={item.key} currency={item} isTop={false} />
              ))}
            </Slider>
          </CurrencyExchangeTab>
          <Numpad onInput={console.log} />
        </Centered>
      </Background>
    </>
  );
}

export default injectIntl(Exchange);
