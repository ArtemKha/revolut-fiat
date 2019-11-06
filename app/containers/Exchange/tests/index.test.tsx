import React, { RefObject } from 'react';
import { render, sleep } from 'utils/test-utils';
import { cleanup, fireEvent, act } from '@testing-library/react';
import Exchange from '../index';
import { SliderMethods } from '../types';

jest.mock('containers/App/actions');

const makeArrangeSet = () => {
  const refs: Array<RefObject<SliderMethods>> = [
    React.createRef(), // outgoing
    React.createRef(), // incoming
  ];
  const afterChange = val => {
    console.log(val);
  };

  return [refs, afterChange];
};

describe('<Exchange />', () => {
  afterEach(cleanup);

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<Exchange />);
    expect(firstChild).toMatchSnapshot();
  });

  it('should update input value on numpad button push', async () => {
    // in progress

    // arrange
    const fE = fireEvent;

    // act
    const { getByTestId, getByText } = render(<Exchange />);

    // [1, '.', 0, 2, 'del', 3].forEach(val =>
    //   fireEvent.click(getByTestId(val.toString())),
    //   );
    fireEvent.click(getByTestId('1'));
    // fireEvent.click(getByTestId('outgoing-input'), { target: { value: 1000 } });

    // assert
    expect((getByTestId('outgoing-input') as HTMLInputElement).value).toBe(
      '+1.03',
    );
  });

  it('should change incoming currency input on outgoing currency change', async () => {
    // arrange
    const value = 1;

    // act
    const { getByTestId } = render(<Exchange />);
    fireEvent.change(getByTestId('outgoing-input'), { target: { value } });

    // assert
    expect((getByTestId('incoming-input') as HTMLInputElement).value).toBe(
      '+1.00',
    );
  });

  it('should update store pockets (and view) on successful exchange', () => {
    // in progress
    // get by test-id
  });
});
