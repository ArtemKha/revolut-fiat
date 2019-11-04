import { put, takeLatest } from 'redux-saga/effects';
import { ratesLoaded, ratesLoadingError } from 'containers/App/actions';
import ActionTypes from 'containers/App/constants';

import request from 'utils/request';

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
      USDEUR: 0.91212,
    };

    // const sec = {
    //   USD: {
    //     USD: 1.11425,
    //     EUR: 1.21425,
    //     GBP: 1,
    //   },
    //   EUR: {
    //     USD: 1.11425,
    //     EUR: 1.21425,
    //     GBP: 1,
    //   },
    //   GBP: {
    //     USD: 1.11425,
    //     EUR: 1.21425,
    //     GBP: 1,
    //   },
    // };
    yield put(ratesLoaded(rates));
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
