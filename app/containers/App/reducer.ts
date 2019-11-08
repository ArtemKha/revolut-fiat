import { ContainerState, ContainerActions, Pocket } from './types';
import ActionTypes from './constants';

const initPockets: Pocket[] = [
  {
    key: 'eur',
    value: 102.05,
    symbol: '€',
  },
  {
    key: 'gbp',
    value: 8.15,
    symbol: '£',
  },
  {
    key: 'usd',
    value: 1023.35,
    symbol: '$',
  },
  {
    key: 'rub',
    value: 240000.15,
    symbol: '₽',
  },
];

// The initial state of the App
export const initialState: ContainerState = {
  loading: false,
  error: false,
  currency: 'eur',
  rates: {},
  pockets: [...initPockets],
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function appReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.LOAD_RATES:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ActionTypes.LOAD_RATES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: state.error,
        rates: action.payload.rates,
      };
    case ActionTypes.LOAD_RATES_ERROR:
      const { error, loading, ...rest } = state;
      return {
        error: action.payload,
        loading: false,
        ...rest,
      };
    case ActionTypes.SET_CURRENCY:
      return {
        ...state,
        currency: action.payload,
      };
    case ActionTypes.SET_POCKETS:
      return {
        ...state,
        pockets: state.pockets.map(pocket => {
          const [updatedPocket] = action.payload.filter(
            newPocket => pocket.key === newPocket.key,
          );
          return updatedPocket ? updatedPocket : pocket;
        }),
      };
    default:
      return state;
  }
}

export default appReducer;
