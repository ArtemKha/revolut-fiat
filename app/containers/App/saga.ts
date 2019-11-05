import { put, takeLatest } from 'redux-saga/effects';
import { ratesLoaded, ratesLoadingError } from 'containers/App/actions';
import ActionTypes from 'containers/App/constants';

import request from 'utils/request';
import { getFullRates } from 'utils/helpers';

export function* getRates() {
  // Select username from store
  const requestURL = `rate url`;

  try {
    // Call our request helper (see 'utils/request')
    // const response = yield call(request, requestURL);
    /*
    from response
      {
        "success": true,
        "timestamp": 1572891245,
        "base": "EUR",
        "date": "2019-11-04",
        "rates": {
          "USD": 1.11425,
          "GBP": 0.863765
        }
      }
    to rates
    */

    const rates = {
      GBPUSD: 1.11425,
      GBPEUR: 0.863765,
      EURUSD: 0.91212,
    };

    console.log(getFullRates(rates));

    yield put(ratesLoaded(getFullRates(rates)));
  } catch (err) {
    yield put(ratesLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* ratesData() {
  console.log('ratesData');
  yield takeLatest(ActionTypes.LOAD_RATES, getRates);
}
