import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { CurrencyExchangeTab, Centered } from './styled';
import Slider from 'components/Slider';
import Input from './CurrencyInput';
import Numpad from './Numpad';
import messages from './messages';
import Header from './Header';
import {
  useSelector as useReduxSelector,
  useDispatch,
  TypedUseSelectorHook,
} from 'react-redux';
import { ApplicationRootState } from 'types';
import { SliderMethods } from './types';
import { setCurrency } from 'containers/App/actions';
import { isValidValue } from './helpers';

const useSelector: TypedUseSelectorHook<
  ApplicationRootState
> = useReduxSelector;

function Exchange({
  intl,
  afterChange = type => {
    return index => {
      return { type, index };
    };
  },
  sliderRefs = [useRef<SliderMethods>(null), useRef<SliderMethods>(null)],
  inputRef = useRef<HTMLInputElement>(null),
}) {
  const dispatch = useDispatch();
  const [pockets, rates, outgoingCurrencyKey] = useSelector(({ global }) => [
    global.pockets,
    global.rates,
    global.currency,
  ]);

  const [outgoingSlider, incomingSlider] = sliderRefs;
  const [outgoingPockets, setOutgoingPockets] = useState(pockets);

  const [outgoingAmount, setOutgoingAmount] = useState('');
  const [incomingAmount, setIncomingAmount] = useState('');

  const [outgoingCurrency, setOutgoingCurrency] = useState(pockets[0]);
  const [incomingCurrency, setIncomingCurrency] = useState(outgoingPockets[0]);

  useEffect(() => {
    // set incoming currency state
    setOutgoingPockets(pockets.filter(o => o.key !== outgoingCurrencyKey));
    const newOutgoingCurrency = pockets.filter(
      o => o.key === outgoingCurrencyKey,
    );
    setOutgoingCurrency(newOutgoingCurrency[0]);

    // reset outgoing currency state
    setOutgoingAmount('');
    setIncomingCurrency(outgoingPockets[0]);
    incomingSlider.current!.slickGoTo(0);
  }, [outgoingCurrencyKey]);

  useEffect(() => {
    // use incomingCurrency here to calculate rate

    const relation = 1;
    setIncomingAmount((Number(outgoingAmount) * relation).toString());
  }, [incomingAmount]);

  function beforeOutgoingChange(_, next) {
    dispatch(setCurrency(pockets[next].key));
  }

  function beforeIncomingChange(_, next) {
    setIncomingCurrency(outgoingPockets[next]);
    console.log(outgoingPockets[next]);
  }

  function onNumpadInput(value) {
    const newValue =
      value === undefined
        ? outgoingAmount.slice(0, -1)
        : outgoingAmount + value;

    console.log(value, newValue);

    if (isValidValue(newValue, outgoingCurrency)) {
      setOutgoingAmount(newValue);
    }
  }

  return (
    <>
      <Helmet>
        <title>{intl.formatMessage(messages.exchange)}</title>
        <meta
          name="description"
          content={intl.formatMessage(messages.exchange)}
        />
      </Helmet>
      <>
        <Centered>
          <Header />
          <CurrencyExchangeTab data-testid="outgoing-slider" isTop={true}>
            <Slider
              refToUse={outgoingSlider}
              beforeChange={beforeOutgoingChange}
              afterChange={afterChange}
            >
              {pockets.map(item => (
                <Input
                  id="outgoing"
                  setRefToUse={ref => (inputRef = ref)}
                  value={outgoingAmount}
                  setValue={setOutgoingAmount}
                  key={item.key}
                  currency={item}
                  isTop={true}
                />
              ))}
            </Slider>
          </CurrencyExchangeTab>
          <CurrencyExchangeTab isTop={false}>
            <Slider
              refToUse={incomingSlider}
              beforeChange={beforeIncomingChange}
              afterChange={afterChange}
            >
              {outgoingPockets.map(item => (
                <Input
                  id="incoming"
                  value={outgoingAmount}
                  setValue={() => null}
                  setRefToUse={ref => null}
                  key={item.key}
                  currency={item}
                  isTop={false}
                />
              ))}
            </Slider>
          </CurrencyExchangeTab>
          <Numpad onInput={onNumpadInput} />
        </Centered>
      </>
    </>
  );
}

export default injectIntl(Exchange);
