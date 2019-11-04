import { action } from 'typesafe-actions';

import ActionTypes from './constants';
import { Repo } from '../RepoListItem/types';

export const loadRepos = () => action(ActionTypes.LOAD_REPOS);
export const reposLoaded = (repos: Repo[], username: string) =>
  action(ActionTypes.LOAD_REPOS_SUCCESS, { repos: repos, username: username });
export const repoLoadingError = (error: object) =>
  action(ActionTypes.LOAD_REPOS_ERROR, error);

export const loadRates = () => action(ActionTypes.LOAD_RATES);
export const ratesLoaded = (rates: any) =>
  action(ActionTypes.LOAD_RATES_SUCCESS, { rates });
export const ratesLoadingError = (error: object) =>
  action(ActionTypes.LOAD_RATES_ERROR, error);

export const setCurrency = (currency: string) =>
  action(ActionTypes.SET_CURRENCY, currency);
