import React, { useEffect } from 'react';
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

function Pockets({ intl, history }) {
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

  const toExchange = () => history.push('/exchange');

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
          <Slider settings={topSliderSettings}>
            {pockets.map(item => (
              <CurrencyInfo key={item.key} currency={item} isTop={true} />
            ))}
          </Slider>
        </SliderContainer>
        <SliderContainer isTop={false}>
          <Slider>
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
