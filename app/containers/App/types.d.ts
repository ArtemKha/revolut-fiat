import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from '../../types';

/* --- STATE --- */

interface Pocket {
  key: string;
  value: number;
  symbol: string;
}

interface AppState {
  readonly loading: boolean;
  readonly error?: object | boolean;
  readonly currency: string;
  readonly pockets: Pocket[];
  readonly rates: any;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ContainerState = AppState;
type ContainerActions = AppActions;

export { RootState, ContainerState, ContainerActions, Pocket };
