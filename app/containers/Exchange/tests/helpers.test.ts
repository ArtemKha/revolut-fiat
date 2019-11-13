import { isValidValue } from '../helpers';

describe('helpers', () => {
  it('should map the rates correctly', () => {
    const pocket = {
      value: 102.05,
    };

    const testedValues: Array<[string, boolean]> = [
      ['1.24', true],
      ['0.12', true],
      ['0.124', false],
      ['124', false],
      ['-', false],
      ['five', false],
    ];

    testedValues.forEach(([value, result]) => {
      expect(isValidValue(value, pocket)).toEqual(result);
    });
  });
});
