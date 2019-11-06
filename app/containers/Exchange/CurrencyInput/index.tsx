import React, { useRef } from 'react';
import { Label, Description, InputLine, Input } from './styled';
import messages from 'containers/Exchange/messages';
import { FormattedMessage } from 'react-intl';
import Rate from '../Rate';
import { isValidValue, numToString } from '../helpers';
import { Pocket } from 'containers/App/types';

interface Props {
  id: string;
  relation: number;
  currencies: Pocket[];
  currency: Pocket;
  isTop?: boolean;
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
  setValue,
  isTop = false,
}) => {
  const [unit, fraction] = currency.value.toString().split('.');
  const fractional = fraction ? '.' + fraction : '';

  const key = currency.key.toUpperCase();
  const inputRef = useRef<HTMLInputElement>(null);
  const prefix = value ? (isTop ? '-' : '+') : '';

  function onChange(e) {
    const { value } = e.target;

    // remove + and - signs before validate
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
