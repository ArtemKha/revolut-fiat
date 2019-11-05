import React, { RefObject } from 'react';
import { render, sleep } from 'utils/test-utils';
import { cleanup, fireEvent } from '@testing-library/react';

import * as appActions from 'containers/App/actions';
import configureStore from '../../../configureStore';
import Exchange from '../index';
import history from '../../../utils/history';
import { act } from 'react-test-renderer';
import { SliderMethods } from '../types';

jest.mock('containers/App/actions');

const renderExchange = () => render(<Exchange />);

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
  // let store;
  // const mockedLoadRepos = appActions.loadRepos as jest.Mock;

  beforeAll(() => {
    // // loadRepos is mocked so that we can spy on it but also so that it doesn't trigger a network request
    // mockedLoadRepos.mockImplementation(() => ({ type: '' }));
  });

  beforeEach(() => {
    // store = configureStore({}, history);
    // mockedLoadRepos.mockClear();
  });

  afterEach(cleanup);

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = renderExchange();
    expect(firstChild).toMatchSnapshot();
  });

  it('should update input value on numpad button push', () => {
    //
  });

  it('should change incoming currency input on outgoing currency change', async () => {
    // make label for input

    // arrange
    const [refs, afterChange] = makeArrangeSet();
    let component;

    // act
    act(() => {
      component = render(
        <Exchange sliderRefs={refs} afterChange={afterChange} />,
      );
      refs[0].current!.slickNext();
    });
    await sleep(1000); // wait for interactions

    // assert
    const outgoingSlider = component.getByTestId('outgoing-slider');
    expect(outgoingSlider).toStrictEqual('?');
  });

  it('should disable an exchange button on an invalid input value (not enough assets to make a trade)', () => {
    // make a button instead of plain text
  });

  it('should update store pockets (and view) on successful exchange', () => {
    // get by test-id
  });

  // it('shouldn`t fetch repos on mount (if username is empty)', () => {
  //   renderExchange();
  //   expect(initialState.username).toBe('');
  //   expect(appActions.loadRepos).not.toHaveBeenCalled();
  // });

  // it('shouldn`t fetch repos if the form is submitted when the username is empty', () => {
  //   const { container } = renderExchange();

  //   const form = container.querySelector('form')!;
  //   fireEvent.submit(form);

  //   expect(appActions.loadRepos).not.toHaveBeenCalled();
  // });

  // it('should fetch repos if the form is submitted when the username isn`t empty', () => {
  //   const { container } = renderExchange();

  //   store.dispatch(changeUsername('julienben'));

  //   const input = container.querySelector('input')!;
  //   fireEvent.change(input, { target: { value: 'julienben' } });
  //   expect(appActions.loadRepos).not.toHaveBeenCalled();

  //   const form = container.querySelector('form')!;
  //   fireEvent.submit(form);
  //   expect(appActions.loadRepos).toHaveBeenCalled();
  // });
});
