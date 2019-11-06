// it definitely needs test, but time is over ¯\_(ツ)_/¯

export function mapResponseToRates(base, rates) {
  const resultRates = {};

  for (const key in rates) {
    if (key) {
      resultRates[base + key] = rates[key];

      const newBase = key;
      for (const newKey in rates) {
        if (newKey) {
          const newRelation = newBase + newKey;
          const notDuplicate =
            !resultRates[newRelation] && !resultRates[newKey + newBase];
          const notSame = newBase !== newKey;
          if (notDuplicate && notSame) {
            resultRates[newRelation] = rates[newKey] / rates[newBase];
          }
        }
      }
    }
  }

  return resultRates;
}

export function getFullRates(rates) {
  const newRates = { ...rates };

  Object.keys(rates).map(key => {
    const [from, to] = [key.substr(0, 3), key.substr(3, 3)];
    const reversed = (1 / rates[key]).toString();

    newRates[to + from] = parseFloat(parseFloat(reversed).toFixed(6));
    newRates[from + from] = 1;
    newRates[to + to] = 1;
  });

  return newRates;
}

export function getSlickMethod([prev, next], array) {
  const isLastBackMove = next === array.length - 1 && prev === 0;
  const isLastNextMove = prev === array.length - 1 && next === 0;
  return (!isLastBackMove && prev < next) || isLastNextMove
    ? 'slickNext'
    : 'slickPrev';
}
