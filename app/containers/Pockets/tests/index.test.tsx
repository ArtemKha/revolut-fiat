import React, { RefObject } from 'react';
import { render, sleep } from 'utils/test-utils';
import { cleanup, fireEvent } from '@testing-library/react';
import Pockets from '../index';
import { SliderMethods } from 'containers/Exchange/types';
import { act } from 'react-test-renderer';

const makeArrangeSet = () => {
  const indexes = { main: 0, top: 1 };
  const refs: Array<RefObject<SliderMethods>> = [
    React.createRef(), // top
    React.createRef(), // main
  ];
  const afterChange = type => {
    return index => {
      indexes[type] = index;
    };
  };

  return [indexes, refs, afterChange];
};
describe('<Pockets />', () => {
  afterEach(cleanup);

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<Pockets />);
    expect(firstChild).toMatchSnapshot();
  });
  it('should update main slider on top slider change', async () => {
    // arrange
    const [indexes, refs, afterChange] = makeArrangeSet();

    // act
    act(() => {
      render(<Pockets sliderRefs={refs} afterChange={afterChange} />);
      refs[0].current!.slickNext();
    });
    await sleep(1000); // wait for interactions

    // assert
    expect(indexes).toStrictEqual({ main: 1, top: 2 });
  });

  it('should update top slider on main slider change', async () => {
    // arrange
    const [indexes, refs, afterChange] = makeArrangeSet();

    // act
    act(() => {
      render(<Pockets sliderRefs={refs} afterChange={afterChange} />);
      refs[1].current!.slickPrev();
    });
    await sleep(1000); // wait for interactions

    // assert
    expect(indexes).toStrictEqual({ main: 2, top: 0 });
  });

  it('should update store outgoing currency on exchange button press', async () => {
    // arrange
    const [_, refs, afterChange] = makeArrangeSet();
    let component;

    // act
    act(() => {
      component = render(
        <Pockets sliderRefs={refs} afterChange={afterChange} />,
      );
      refs[1].current!.slickNext();
    });
    await sleep(1000); // wait for interactions
    fireEvent.click(component.getByText(/exchange/i));

    // assert
    const { currency } = component.store.getState().global;
    expect(currency).toBe('gbp');
  });
});
