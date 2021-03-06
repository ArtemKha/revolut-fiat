import { action } from 'typesafe-actions';

import ActionTypes from './constants';
import { Pocket } from './types';

export const loadRates = () => action(ActionTypes.LOAD_RATES);
export const ratesLoaded = (rates: any) =>
  action(ActionTypes.LOAD_RATES_SUCCESS, { rates });
export const ratesLoadingError = (error: object) =>
  action(ActionTypes.LOAD_RATES_ERROR, error);

export const setCurrency = (currency: string) =>
  action(ActionTypes.SET_CURRENCY, currency);

export const updatePockets = (pockets: Pocket[]) =>
  action(ActionTypes.SET_POCKETS, pockets);
