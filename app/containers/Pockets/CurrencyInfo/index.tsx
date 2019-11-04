import React from 'react';
import { Info, Amount, Fraction, Description } from './styled';
import { DollarOutline, PoundOutline, EuroOutline } from '@ant-design/icons';

import { Icon } from 'components/Icon';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/Pockets/messages';

const icons = {
  usd: DollarOutline,
  eur: EuroOutline,
  gbp: PoundOutline,
};
interface Props {
  currency: any;
  isTop?: boolean;
}
const CurrencyInfo: React.FC<Props> = ({ currency, isTop = false }) => {
  const [unit, fractional] = currency.value.toString().split('.');

  return (
    <Info isTop={isTop}>
      <Icon
        icon={icons[currency.key] || PoundOutline}
        extraSVGAttrs={{ width: '2em', height: '2em', fill: '#fff' }}
      />
      <Amount>
        {unit}
        <Fraction>.{fractional}</Fraction>
      </Amount>
      {currency.key.toUpperCase()}
      <Description>
        <FormattedMessage {...messages.description} />
      </Description>
    </Info>
  );
};

export default CurrencyInfo;
