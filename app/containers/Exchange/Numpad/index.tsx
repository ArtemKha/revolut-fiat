import React from 'react';
import { CaretLeftOutline } from '@ant-design/icons';
import { Numbers, Cell, Container, Delete } from './styled';
import { Icon } from 'components/Icon';

interface IAppProps {
  onInput: (v: string) => void;
}
const Numpad: React.FC<IAppProps> = ({ onInput }) => {
  const pushValue = e => {
    const value = e.target.innerText;
    onInput(value);
  };
  return (
    <Container>
      <Numbers onClick={pushValue} data-testid="numpad-input">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map(value => (
          <Cell key={value} data-testid={value}>
            {value}
          </Cell>
        ))}
        <Cell data-testid="del">
          <Delete>
            <Icon icon={CaretLeftOutline} />
          </Delete>
        </Cell>
      </Numbers>
    </Container>
  );
};

export default Numpad;
