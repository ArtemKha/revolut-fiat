import {
  mapResponseToRates,
  getFullRates,
  getSlickMethod,
} from 'utils/helpers';

describe('helpers', () => {
  let base;
  let rates;
  let resultRatesArranged;
  let invertedRatesArranged;

  beforeEach(() => {
    const response = {
      success: true,
      timestamp: 1573643646,
      base: 'EUR',
      date: '2019-11-13',
      rates: {
        GBP: 0.856675,
        USD: 1.101261,
        RUB: 70.84641,
      },
    };

    resultRatesArranged = {
      EURGBP: 0.856675,
      GBPUSD: 1.2855061721189485,
      GBPRUB: 82.69928502641027,
      EURUSD: 1.101261,
      USDRUB: 64.33207931634735,
      EURRUB: 70.84641,
    };

    invertedRatesArranged = {
      EURGBP: 0.856675,
      GBPUSD: 1.2855061721189485,
      GBPRUB: 82.69928502641027,
      EURUSD: 1.101261,
      USDRUB: 64.33207931634735,
      EURRUB: 70.84641,
      GBPEUR: 1.167304,
      USDGBP: 0.777904,
      RUBGBP: 0.012092,
      USDEUR: 0.90805,
      RUBUSD: 0.015544,
      RUBEUR: 0.014115,
    };

    base = response.base;
    rates = response.rates;
  });

  describe('mapResponseToRates', () => {
    it('should map the rates correctly', () => {
      const ratesSuitTwo = {
        GBP: 0.856675,
        USD: 1.101261,
      };

      const resultRatesArrangedSuitTwo = {
        EURGBP: 0.856675,
        GBPUSD: 1.2855061721189485,
        EURUSD: 1.101261,
      };

      const testedRates = [
        mapResponseToRates(base, rates),
        mapResponseToRates(base, ratesSuitTwo),
        mapResponseToRates(base, {}),
      ];

      expect(testedRates).toEqual([
        resultRatesArranged,
        resultRatesArrangedSuitTwo,
        {},
      ]);
    });
  });

  describe('getFullRates', () => {
    it('should invert rates correctly', () => {
      const resultRatesArrangedSuitTwo = {
        EURGBP: 0.856675,
        GBPUSD: 1.2855061721189485,
        EURUSD: 1.101261,
      };

      const invertedRatesSuitTwo = {
        EURGBP: 0.856675,
        GBPUSD: 1.2855061721189485,
        EURUSD: 1.101261,
        GBPEUR: 1.167304,
        USDGBP: 0.777904,
        USDEUR: 0.90805,
      };

      const testedInvertedRates = [
        getFullRates(resultRatesArranged),
        getFullRates(resultRatesArrangedSuitTwo),
        getFullRates({}),
      ];

      expect(testedInvertedRates).toEqual([
        invertedRatesArranged,
        invertedRatesSuitTwo,
        {},
      ]);
    });
  });

  describe('getSlickMethod', () => {
    it('should return correct method', () => {
      const suits = [
        {
          prev: 0,
          next: 1,
          array: new Array(3),
          result: 'slickNext',
        },
        {
          prev: 1,
          next: 0,
          array: new Array(3),
          result: 'slickPrev',
        },
        {
          prev: -3,
          next: 0,
          array: new Array(4),
          result: 'slickNext',
        },
        {
          prev: 0,
          next: -3,
          array: new Array(4),
          result: 'slickPrev',
        },
      ];

      for (const suit of suits) {
        expect(getSlickMethod([suit.prev, suit.next], suit.array)).toEqual(
          suit.result,
        );
      }
    });
  });
});
