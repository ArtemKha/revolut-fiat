import React, { useState, useRef } from 'react';
import { Label, Fraction, Description, InputLine, Input } from './styled';
import messages from 'containers/Exchange/messages';
import { FormattedMessage } from 'react-intl';
import Rate from '../Rate';
import { isValidValue, numToString } from '../helpers';

interface Props {
  id: string;
  currency: any;
  isTop?: boolean;
  setRefToUse: any;
  value: string;
  setValue: (value: string) => void;
}
const CurrencyInput: React.FC<Props> = ({
  id,
  setRefToUse,
  currency,
  value,
  setValue,
  isTop = false,
}) => {
  const [unit, fractional] = currency.value.toString().split('.');
  const key = currency.key.toUpperCase();
  const inputRef = useRef<HTMLInputElement>(null);
  const prefix = value ? (isTop ? '-' : '+') : '';

  function onChange(e) {
    // need to test

    // remove prefix
    const { value } = e.target;
    const num = value
      .split('')
      .filter(char => !['-', '+'].includes(char))
      .join('');

    if (isValidValue(num, currency)) {
      setValue(numToString(num));
    } else {
      // make input flash (user friendly)
    }
  }

  function onFocus() {
    setRefToUse(inputRef);
  }

  return (
    <>
      <InputLine>
        <Label htmlFor={id} data-testid={id + '-label'}>
          {key}
        </Label>
        <Input
          id={id}
          ref={inputRef}
          value={prefix + value}
          onChange={onChange}
          onFocus={onFocus}
          type="text"
          maxLength={11}
          size={11}
          disabled={!isTop}
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

export default CurrencyInput;
