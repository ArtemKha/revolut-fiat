import React, { useEffect, useRef, useState, MutableRefObject } from 'react';
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
import { setCurrency, updatePockets } from 'containers/App/actions';
import { isValidValue, numToString } from './helpers';
import { Pocket } from 'containers/App/types';

const useSelector: TypedUseSelectorHook<
  ApplicationRootState
> = useReduxSelector;

interface Props {
  intl: any;
  sliderRefs?: Array<MutableRefObject<SliderMethods>>;

  // these two props below for test only
  afterChange?: (index: number) => void;
  inputRef?: MutableRefObject<HTMLInputElement>;
}
const Exchange: React.FC<Props> = ({
  intl,
  sliderRefs = [useRef<SliderMethods>(null), useRef<SliderMethods>(null)],
  afterChange = type => {
    return index => {
      return { type, index };
    };
  },
  inputRef = useRef<HTMLInputElement>(null),
}) => {
  const [pockets, rates, outgoingCurrencyKey] = useSelector(({ global }) => [
    global.pockets,
    global.rates,
    global.currency,
  ]);
  const [outgoingSlider, incomingSlider] = sliderRefs;

  const dispatch = useDispatch();

  /*
    I used these states because i have no direct access on current slide state (no such api)
    Also no time to refactor properly ¯\_(ツ)_/¯
  */

  const [init] = useState(getOutgoingCurrencyIndex());
  const [hasError, setHasError] = useState(false);

  const [incomingPockets, setIncomingPockets] = useState(getIncomingPockets());
  const [outgoingAmount, setOutgoingAmount] = useState('');
  const [incomingAmount, setIncomingAmount] = useState('');
  const [relation, setRelation] = useState(1);
  const [outgoingCurrency, setOutgoingCurrency] = useState<Pocket>(
    getOutgoingCurrency(),
  );
  const [incomingCurrency, setIncomingCurrency] = useState<Pocket>(
    incomingPockets[0],
  );

  /* getters */

  function getIncomingPockets() {
    return pockets.filter(o => o.key !== outgoingCurrencyKey);
  }

  function getOutgoingCurrency() {
    return pockets.find(o => o.key === outgoingCurrencyKey)!;
  }

  function getOutgoingCurrencyIndex() {
    return pockets.findIndex(pocket => pocket.key === outgoingCurrencyKey);
  }

  /* effects */

  // sync amounts and pockets state
  useEffect(() => {
    // reset outgoing currency state
    const newOutgoingCurrencyIndex = getOutgoingCurrencyIndex();
    setOutgoingAmount('');
    setOutgoingCurrency(pockets[newOutgoingCurrencyIndex]);

    // reset incoming currency state
    const newIncomingPockets = getIncomingPockets();
    setIncomingPockets(newIncomingPockets);
    setIncomingCurrency(newIncomingPockets[0]);
    incomingSlider.current!.slickGoTo(0);
  }, [
    outgoingCurrencyKey, // on store currency key update
    pockets, // on currency exchange
  ]);

  // track relation
  useEffect(() => {
    const key = (outgoingCurrency.key + incomingCurrency.key).toUpperCase();
    if (rates[key]) {
      setRelation(rates[key]);
    }
  }, [outgoingCurrency, incomingCurrency, rates]);

  // track outgoing amount
  useEffect(() => {
    const newOutgoingAmount = (Number(outgoingAmount) * relation).toFixed(2);
    setIncomingAmount(
      Boolean(Number(newOutgoingAmount)) ? newOutgoingAmount : '',
    );
  }, [outgoingAmount, relation]);

  /* actions */

  function beforeOutgoingChange(_, next) {
    dispatch(setCurrency(pockets[next].key));
  }

  function beforeIncomingChange(_, next) {
    setIncomingCurrency(incomingPockets[next]);
  }

  function setOutgoingValueAndValidate(num: string) {
    if (isValidValue(num, outgoingCurrency)) {
      setOutgoingAmount(num);
    } else {
      setHasError(true);
      setTimeout(() => {
        setHasError(false);
      }, 500);
    }
  }

  function onNumpadInput(value) {
    const newValue =
      value === undefined
        ? outgoingAmount.slice(0, -1)
        : outgoingAmount + value;
    setOutgoingValueAndValidate(newValue);
  }

  function onExchange() {
    if (!parseFloat(outgoingAmount)) {
      return;
    }

    const makeFixed = (num: number) => parseFloat(num.toFixed(2));

    const newPockets: Pocket[] = [
      {
        ...incomingCurrency,
        value: makeFixed(incomingCurrency.value + parseFloat(incomingAmount)),
      },
      {
        ...outgoingCurrency,
        value: makeFixed(outgoingCurrency.value - parseFloat(outgoingAmount)),
      },
    ];
    dispatch(updatePockets(newPockets));
    setOutgoingAmount('');
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
              infinite={false}
              initialSlide={init}
              refToUse={outgoingSlider}
              beforeChange={beforeOutgoingChange}
              afterChange={afterChange}
            >
              {pockets.map(item => (
                <Input
                  id="outgoing"
                  isActive={outgoingCurrency.key === item.key}
                  setRefToUse={ref => (inputRef = ref)}
                  value={outgoingAmount}
                  setValue={setOutgoingValueAndValidate}
                  key={item.key}
                  currency={item}
                  relation={relation}
                  currencies={[outgoingCurrency, incomingCurrency]}
                  hasError={hasError}
                />
              ))}
            </Slider>
          </CurrencyExchangeTab>
          <CurrencyExchangeTab isTop={false}>
            <Slider
              infinite={false}
              refToUse={incomingSlider}
              beforeChange={beforeIncomingChange}
              afterChange={afterChange}
            >
              {incomingPockets.map(item => (
                <Input
                  id="incoming"
                  isActive={incomingCurrency.key === item.key}
                  value={incomingAmount}
                  setValue={() => null}
                  setRefToUse={ref => null}
                  key={item.key}
                  currency={item}
                  relation={relation}
                  currencies={[outgoingCurrency, incomingCurrency]}
                  hasError={false}
                />
              ))}
            </Slider>
          </CurrencyExchangeTab>
          <Numpad onInput={onNumpadInput} />
        </Centered>
      </>
    </>
  );
};

export default injectIntl(Exchange);
