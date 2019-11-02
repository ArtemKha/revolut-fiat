import React from 'react';
// import { NumericInput } from 'numeric-keyboard/dist/numeric_keyboard.react.js';
// import layout from './keys';
import { CaretLeftOutline } from '@ant-design/icons';
import { Numbers, Cell, Container, Delete } from './styled';
import { Icon } from 'components/Icon';

interface IAppProps {
  onInput: () => void;
}
const Numpad: React.FC<IAppProps> = ({ onInput }) => {
  // const pad = new NumericInput({
  //   type: 'number',
  //   placeholder: 'touch to input',
  //   onInput,
  //   layout: keys,
  // }).mount('.numeric-keyboard-input');

  // return <div className="numeric-keyboard-input" />;
  // return <NumericInput layout={layout} onInput={onInput} autofocus={true} />;

  return (
    <Container>
      {/* <input class="input-number" readonly="true" type="text" placeholder="1234567890"/> */}
      <Numbers>
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
