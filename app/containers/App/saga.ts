import { put, takeLatest, call } from 'redux-saga/effects';
import { ratesLoaded, ratesLoadingError } from 'containers/App/actions';
import ActionTypes from 'containers/App/constants';

import request from 'utils/request';
import { getFullRates, mapResponseToRates } from 'utils/helpers';

interface Rates {
  [key: string]: number;
}
export function* getRates() {
  // I'll reset token in a few days
  const key = '0fac8504b6214c30dc66a257e807e7da';
  const requestURL = `http://data.fixer.io/api/latest?access_key=${key}&symbols=GBP,USD,EUR,RUB`;

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL);

    if (response.success) {
      const { base, rates } = response;

      const resultRates: Rates = mapResponseToRates(base, rates);
      const invertedRates = getFullRates(resultRates);

      yield put(ratesLoaded(invertedRates));
    } else {
      yield put(ratesLoadingError(response.error));
    }
  } catch (err) {
    yield put(ratesLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* ratesData() {
  yield takeLatest(ActionTypes.LOAD_RATES, getRates);
}
