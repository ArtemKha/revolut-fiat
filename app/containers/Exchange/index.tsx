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

// (50%) 1. to exchange
// 2. red flash
// 3. to test
// (50%) 4. load rates

const useSelector: TypedUseSelectorHook<
  ApplicationRootState
> = useReduxSelector;

function getOutgoingPockets(pockets, outgoingCurrencyKey) {
  return pockets.filter(o => o.key !== outgoingCurrencyKey);
}

function getOutgoingCurrency(pockets, outgoingCurrencyKey) {
  return pockets.filter(o => o.key === outgoingCurrencyKey)[0];
}

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

  /*
    I used these states because i have no direct access on current slide state (no such api)
    Also no time to refactor properly ¯\_(ツ)_/¯
  */

  const [outgoingSlider, incomingSlider] = sliderRefs;
  const [outgoingPockets, setOutgoingPockets] = useState(
    getOutgoingPockets(pockets, outgoingCurrencyKey),
  );

  const [outgoingAmount, setOutgoingAmount] = useState('');
  const [incomingAmount, setIncomingAmount] = useState('');
  const [relation, setRelation] = useState(1);

  const [outgoingCurrency, setOutgoingCurrency] = useState(
    getOutgoingCurrency(pockets, outgoingCurrencyKey),
  );
  const [incomingCurrency, setIncomingCurrency] = useState(outgoingPockets[0]);

  useEffect(() => {
    // set incoming currency state
    const newOutgoingPockets = getOutgoingPockets(pockets, outgoingCurrencyKey);
    const newOutgoingCurrency = getOutgoingCurrency(
      pockets,
      outgoingCurrencyKey,
    );

    setOutgoingPockets(newOutgoingPockets);
    setOutgoingCurrency(newOutgoingCurrency);

    // reset outgoing currency state
    setOutgoingAmount('');
    setIncomingCurrency(newOutgoingPockets[0]);
    incomingSlider.current!.slickGoTo(0);
  }, [outgoingCurrencyKey]);

  useEffect(() => {
    console.log('isSame', outgoingCurrency.key === incomingCurrency.key);
    const key = (outgoingCurrency.key + incomingCurrency.key).toUpperCase();
    console.log(rates[key], outgoingCurrency.key, incomingCurrency.key);
    if (rates[key]) {
      setRelation(rates[key]);
    }
  }, [outgoingCurrency, incomingCurrency]);

  useEffect(() => {
    const newOutgoingAmount = (Number(outgoingAmount) / relation).toFixed(2);
    setIncomingAmount(
      Boolean(Number(newOutgoingAmount)) ? newOutgoingAmount : '',
    );
  }, [outgoingAmount]);

  function beforeOutgoingChange(_, next) {
    dispatch(setCurrency(pockets[next].key));
  }

  function beforeIncomingChange(_, next) {
    setIncomingCurrency(outgoingPockets[next]);
  }

  function onNumpadInput(value) {
    const newValue =
      value === undefined
        ? outgoingAmount.slice(0, -1)
        : outgoingAmount + value;

    if (isValidValue(newValue, outgoingCurrency)) {
      setOutgoingAmount(newValue);
    }
  }

  function onExchange() {
    //
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
          <Header
            onExchange={onExchange}
            relation={relation}
            currencies={[outgoingCurrency, incomingCurrency]}
          />
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
                  relation={relation}
                  currencies={[outgoingCurrency, incomingCurrency]}
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
                  value={incomingAmount}
                  setValue={() => null}
                  setRefToUse={ref => null}
                  key={item.key}
                  currency={item}
                  relation={relation}
                  currencies={[outgoingCurrency, incomingCurrency]}
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
