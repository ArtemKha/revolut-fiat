import React, { useRef, useState } from 'react';
import { Label, Description, InputLine, StyledInput } from './styled';
import messages from 'containers/Exchange/messages';
import { FormattedMessage } from 'react-intl';
import Rate from '../Rate';
import { Pocket } from 'containers/App/types';

interface Props {
  id: string;
  relation: number;
  currencies: Pocket[];
  currency: Pocket;
  isActive: boolean;
  hasError: boolean;
  setRefToUse: any;
  value: string;
  setValue: (value: string) => void;
}
const CurrencyInput: React.FC<Props> = ({
  id,
  relation,
  setRefToUse,
  currencies,
  currency,
  value,
  hasError,
  isActive,
  setValue,
}) => {
  const [unit, fraction] = currency.value.toString().split('.');
  const fractional = fraction ? '.' + fraction : '';
  const isTop = id === 'outgoing';

  const key = currency.key.toUpperCase();
  const inputRef = useRef<HTMLInputElement>(null);
  const prefix = value ? (isTop ? '-' : '+') : '';

  function onChange(e) {
    const { value } = e.target;

    // remove + and - signs before validate
    const stringValue = value
      .split('')
      .filter(char => !['-', '+'].includes(char))
      .join('');

    setValue(stringValue);
  }

  function onFocus() {
    setRefToUse(inputRef);
  }

  const testInputId = isActive ? id + '-input' : id + '-inactive-input';
  const testLabelId = isActive ? id + '-label' : id + '-inactive-label';

  return (
    <>
      <InputLine>
        <Label htmlFor={id + currency.key} data-testid={testLabelId}>
          {key}
        </Label>
        <StyledInput
          id={id + currency.key}
          data-testid={testInputId}
          className={hasError ? 'shake' : ''}
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
          <FormattedMessage {...messages.have} /> {unit}
          {fractional} {key}
        </Description>
        <Description>
          {!isTop && (
            <Rate type="incoming" relation={relation} currencies={currencies} />
          )}
        </Description>
      </InputLine>
    </>
  );
};

export default CurrencyInput;
