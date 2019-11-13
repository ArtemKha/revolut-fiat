import React from 'react';
import { Container, Low } from './styled';
import { Pocket } from 'containers/App/types';
import { getDigits } from './helpers';

interface IAppProps {
  type: string;
  relation: number;
  currencies: Pocket[];
}
const Rate: React.FC<IAppProps> = ({ type, relation, currencies }) => {
  const relationToUse =
    type === 'incoming' ? relation : (1 / relation).toFixed(5);
  const [regular, highFraction, lowFraction] = getDigits(relationToUse);

  const firstIndex = type === 'incoming' ? 1 : 0;
  const secondIndex = firstIndex === 0 ? 1 : 0;

  return (
    <Container>
      {currencies[firstIndex].symbol}1 = {currencies[secondIndex].symbol}
      {regular}
      {highFraction && '.'}
      {highFraction}
      <Low>{lowFraction}</Low>
    </Container>
  );
};

export default Rate;
