export function isValidValue(value, pocket) {
  // definitely needs test, but time is limited ¯\_(ツ)_/¯

  const isValidCurrencyAmount = /^-?\d*[.,]?\d{0,2}$/.test(value);
  const isNull = /^0\d/.test(value);
  const isAmountAvailable = value === '' || pocket.value >= parseFloat(value);

  return isValidCurrencyAmount && !isNull && isAmountAvailable;
}

export const numToString = num => num.toString().replace(',', '.');
