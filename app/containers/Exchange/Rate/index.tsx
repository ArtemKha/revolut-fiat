import React from 'react';
import { Container, Low } from './styled';

interface IAppProps {
  input?: any;
}
const Rate: React.FC<IAppProps> = ({ input = 1.2173 }) => {
  // test it out
  const [regular, fraction] = input.toString().split('.');
  const [highFraction, lowFraction] = [fraction.slice(0, 2), fraction.slice(2)];

  return (
    <Container>
      $1 = £{regular}.{highFraction}
      <Low>{lowFraction}</Low>
    </Container>
  );
};

export default Rate;
