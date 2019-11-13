import { getDigits, splitRate } from '../helpers';

describe('helpers', () => {
  it('should split float correctly', () => {
    const testedValues: Array<[string, string[]]> = [
      ['1.24325', ['1', '24325']],
      ['11234', ['11234', '']],
      ['122.24325', ['122', '24325']],
    ];

    testedValues.forEach(([value, result]) => {
      expect(splitRate(value)).toEqual(result);
    });
  });

  it('should return fractions correctly', () => {
    const testedValues: Array<[string, string[]]> = [
      ['1.24325', ['1', '24', '325']],
      ['121.3445454', ['121', '34', '45454']],
      ['0.24325', ['0', '24', '325']],
      ['24325', ['24325', '', '']],
      ['243.25', ['243', '25', '']],
      ['243.2525', ['243', '25', '25']],
    ];

    testedValues.forEach(([value, result]) => {
      expect(getDigits(value)).toEqual(result);
    });
  });
});
