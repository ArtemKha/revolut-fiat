import React from 'react';
import { Container, Low } from './styled';
import { Pocket } from 'containers/App/types';

function splitRate(rate) {
  const str = rate.toString();
  const hasDot = str.includes('');
  return hasDot ? str.split('.') : [str];
}

interface IAppProps {
  type: string;
  relation: number;
  currencies: Pocket[];
}
const Rate: React.FC<IAppProps> = ({ type, relation, currencies }) => {
  const relationToUse =
    type === 'incoming' ? relation : (1 / relation).toFixed(2);

  const [regular, fraction] = splitRate(relationToUse);
  const [highFraction, lowFraction] = fraction
    ? [fraction.slice(0, 2), fraction.slice(2)]
    : [regular, ''];

  const firstIndex = type === 'incoming' ? 1 : 0;
  const secondIndex = firstIndex === 0 ? 1 : 0;

  return (
    <Container>
      {currencies[firstIndex].symbol}1 = {currencies[secondIndex].symbol}
      {regular}.{highFraction}
      <Low>{lowFraction}</Low>
    </Container>
  );
};

export default Rate;
