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
      <Numbers onClick={pushValue}>
        <Cell>1</Cell>
        <Cell>2</Cell>
        <Cell>3</Cell>
        <Cell>4</Cell>
        <Cell>5</Cell>
        <Cell>6</Cell>
        <Cell>7</Cell>
        <Cell>8</Cell>
        <Cell>9</Cell>
        <Cell> .</Cell>
        <Cell>0</Cell>
        <Cell>
          <Delete>
            <Icon icon={CaretLeftOutline} />
          </Delete>
        </Cell>
      </Numbers>
    </Container>
  );
};

export default Numpad;
