export function getSlickMethod([prev, next], array) {
  const isLastBackMove = next === array.length - 1 && prev === 0;
  const isLastNextMove = prev === array.length - 1 && next === 0;
  return (!isLastBackMove && prev < next) || isLastNextMove
    ? 'slickNext'
    : 'slickPrev';
}
