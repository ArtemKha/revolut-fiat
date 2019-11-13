export function splitRate(rate) {
  const str = rate.toString();
  const hasDot = str.includes('.');
  return hasDot ? str.split('.') : [str, ''];
}

export function getDigits(relationToUse) {
  const [regular, fraction] = splitRate(relationToUse);
  const [high, low] = fraction
    ? [fraction.slice(0, 2), fraction.slice(2)]
    : ['', ''];

  return [regular, high, low];
}
