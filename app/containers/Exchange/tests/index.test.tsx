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

/*
  These tests is not completely done yet
  (as well as others in App folder, need more time to finish)
*/

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
    const clicks = [1, '.', 0, 2, 'del', 3];

    // act
    const { getByTestId, getByText } = render(<Exchange />);
    clicks.forEach(val => fireEvent.click(getByTestId(val.toString())));

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

    // arrange
    const value = 1;
    const currency = 'eur';

    // act
    const { getByTestId, getByText, store } = render(<Exchange />);
    fireEvent.change(getByTestId('outgoing-input'), { target: { value } });
    fireEvent.click(getByText(/exchange/i));

    const {
      global: { pockets },
    } = store.getState();

    // assert
    const amount = pockets.filter(item => item.key === currency)!.key;
    expect(amount).toBe(101.05);
  });
});
