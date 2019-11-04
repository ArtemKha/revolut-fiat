import React, { useState } from 'react';
import { Amount, Fraction, Description, InputLine, Input } from './styled';
import messages from 'containers/Exchange/messages';
import { FormattedMessage } from 'react-intl';
import Rate from '../Rate';
interface Props {
  currency: any;
  isTop?: boolean;
}
const CurrencyInfo: React.FC<Props> = ({ currency, isTop = false }) => {
  const [outGoing, setOutGoing] = useState(24.12);
  const [unit, fractional] = currency.value.toString().split('.');
  const key = currency.key.toUpperCase();

  function onChange(e) {
    // need to test

    const { value } = e.target;
    const isValid = /^-?\d*[.,]?\d{0,2}$/.test(value);
    const n = value.toString().replace(',', '.');
    console.log(n, value);
    if (isValid) {
      setOutGoing(n);
    }
  }

  return (
    <>
      <InputLine>
        <Amount>{key}</Amount>
        <Input
          value={outGoing}
          onChange={onChange}
          type="text"
          maxLength={11}
          size={11}
        />
      </InputLine>
      <InputLine>
        <Description>
          <FormattedMessage {...messages.have} /> {unit}.{fractional} {key}
        </Description>
        <Description>{!isTop && <Rate input={0.8972} />}</Description>
      </InputLine>
    </>
  );
};

export default CurrencyInfo;
