import React, { useState, useRef, useEffect, MutableRefObject } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { TransactionOutline } from '@ant-design/icons';
import { RouterProps } from 'react-router';
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
  afterChange?: any;
  sliderRefs?: Array<MutableRefObject<SliderMethods>>;
}
const Pockets: React.FC<Props> = ({
  intl,
  history = {
    push: () => {},
  },
  afterChange = type => {
    return index => {
      return { type, index };
    };
  },
  sliderRefs = [useRef<SliderMethods>(null), useRef<SliderMethods>(null)],
}) => {
  const pockets = useSelector(state => state.global.pockets);
  const dispatch = useDispatch();

  const [pocket, setPocket] = useState(pockets[0]);
  const [lastCaller, setLastCaller] = useState('');
  const [topSlider, mainSlider] = sliderRefs;

  const topSliderSettings = {
    slidesToShow: 2,
    initialSlide: 1,
    dots: false,
  };

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
      setPocket(pockets[indexes[1]]);
    }
  }

  function onExchange() {
    dispatch(setCurrency(pocket.key));
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
            data-testId="topSlider"
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
            data-testId="mainSlider"
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
