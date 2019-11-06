import React, { useState, useRef, MutableRefObject } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { TransactionOutline } from '@ant-design/icons';
import { RouterProps } from 'react-router';
import { getSlickMethod } from 'utils/helpers';
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
  useDispatch,
} from 'react-redux';

import { SliderMethods } from 'containers/Exchange/types';
import { ApplicationRootState } from 'types';
import Slider from 'components/Slider';
import { Icon } from 'components/Icon';
import Footer from './Footer';
import CurrencyInfo from './CurrencyInfo';
import messages from './messages';
import { Control, SliderContainer, ControlIcon, ControlLabel } from './styled';
import { setCurrency } from 'containers/App/actions';

const useSelector: TypedUseSelectorHook<
  ApplicationRootState
> = useReduxSelector;

interface Props extends RouterProps {
  intl?: any;
  afterChange?: (type: string) => (index: number) => void;
  sliderRefs?: Array<MutableRefObject<SliderMethods>>;
}
const Pockets: React.FC<Props> = ({
  intl,
  history,
  afterChange = type => {
    return index => {
      return { type, index };
    };
  },
  sliderRefs = [useRef<SliderMethods>(null), useRef<SliderMethods>(null)],
}) => {
  const dispatch = useDispatch();

  const [pockets, currency] = useSelector(state => [
    state.global.pockets,
    state.global.currency,
  ]);
  const [init] = useState(getOutgoingCurrencyIndex());

  const [lastCaller, setLastCaller] = useState('');
  const [topSlider, mainSlider] = sliderRefs;

  const topSliderSettings = {
    slidesToShow: 2,
    initialSlide: 1,
    dots: false,
  };

  function getOutgoingCurrencyIndex() {
    return pockets.findIndex(pocket => pocket.key === currency);
  }

  function updateSlider(indexes, caller) {
    const method = getSlickMethod(indexes, pockets);

    setLastCaller(caller);

    if (caller === 'top') {
      mainSlider.current![method]();
    } else {
      topSlider.current![method]();
    }

    setLastCaller('');
  }

  function beforeTopChange(prev, next) {
    if (!lastCaller || lastCaller !== 'main') {
      updateSlider([prev, next], 'top');
    }
  }

  function beforeMainChange(prev, next) {
    dispatch(setCurrency(pockets[next].key));

    if (!lastCaller || lastCaller !== 'top') {
      updateSlider([prev, next], 'main');
    }
  }

  function onExchange() {
    history.push('/exchange');
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
      <>
        <SliderContainer isTop={true}>
          <Slider
            {...topSliderSettings}
            beforeChange={beforeTopChange}
            afterChange={afterChange('top')}
            refToUse={topSlider}
          >
            {pockets.map(item => (
              <CurrencyInfo key={item.key} currency={item} isTop={true} />
            ))}
          </Slider>
        </SliderContainer>
        <SliderContainer isTop={false}>
          <Slider
            initialSlide={init}
            refToUse={mainSlider}
            beforeChange={beforeMainChange}
            afterChange={afterChange('main')}
          >
            {pockets.map(item => (
              <CurrencyInfo key={item.key} currency={item} />
            ))}
          </Slider>
        </SliderContainer>
        <Footer>
          <Control onClick={onExchange}>
            <ControlIcon>
              <Icon icon={TransactionOutline} />
            </ControlIcon>
            <ControlLabel>
              <FormattedMessage {...messages.exchange} />
            </ControlLabel>
          </Control>
        </Footer>
      </>
    </>
  );
};

export default injectIntl(Pockets);
