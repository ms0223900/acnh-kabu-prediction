import { KabuTrendType, SingleWeekKabuRecord } from "../types";
import handleCalKabu from "./handleCalKabu";
import { KabuTrendsAndHighestPricePosition } from '../types';

const reboundTrendSeperatingMulti = 1.4;
export const noReboundPosition = -1000;
//check decrement first(last position is thu afternoon(index: 8))
const lastCheckReboundPosition = 8 + 1;

class HandleKabuTrends {
  //from sun ~ sat, length is 13
  static getThisWeekPrices(otherDaysPrices: SingleWeekKabuRecord['otherDaysPrice']): number[] {
    return [
      otherDaysPrices.sun.morning,

      otherDaysPrices.mon.morning,
      otherDaysPrices.mon.afternoon,

      otherDaysPrices.tue.morning,
      otherDaysPrices.tue.afternoon,

      otherDaysPrices.wed.morning,
      otherDaysPrices.wed.afternoon,

      otherDaysPrices.thu.morning,
      otherDaysPrices.thu.afternoon,

      otherDaysPrices.fri.morning,
      otherDaysPrices.fri.afternoon,

      otherDaysPrices.sat.morning,
      otherDaysPrices.sat.afternoon,
    ];
  }
  
  static getKabuTrendPredictionsFromKabuValue(kabuValue: number | string): KabuTrendType[] {
    const K = Number(kabuValue);
    if(K === 0) {
      return ['notDefined'];
    }
    if(K >= 90) {
      return ['wave', 'forth'];
    }
    else if(K >= 85) {
      return ['third', 'forth', 'decrement'];
    } 
    else if(K >= 80) {
      return ['forth'];
    }
    else if(K >= 60) {
      return ['wave', 'forth'];
    }
    return ['forth'];
  }

  static checkPricesAreAllBiggerThanZero(prices: number[]) {
    if(prices.includes(0)) {
      return false;
    }
    return true;
  }

  static getTwoNumbersRatio(number1: number, number2: number) {
    if(number2 === 0) {
      return 0;
    }
    return number2 - number1;
  }

  static getPriceMultiWithOriginPrice(prices: number[]) {
    const originPrice = prices[0];
    return prices.map(p => {
      if(originPrice === 0) {
        return 0;
      }
      return (
        Number((p / originPrice).toFixed(2))
      );
    });
  }

  static getPricesRatios(prices: number[]) {
    let res: number[] = [];
    for (let i = 0; i < prices.length; i++) {
      //only sunday
      if(i === 0) {
        res[i] = 0;
      } else {
        res[i] = this.getTwoNumbersRatio(prices[i - 1], prices[i]);
      }
    }
    return res;
  }

  static getPositionOfReboundInPriceRatios(priceRatios: number[]) {
    let position = -1; //rebound not confirmed

    for (let i = 0; i < priceRatios.length; i++) {
      const ratio = priceRatios[i];
      //exclude sunday position
      if(ratio > 0) {
        //if ratio is bigger than 0, it is not a decrement type
        position = i;
        break;
      }
    }

    return position;
  }

  static getReboundAndHighestPricePosition(prices: number[]): {
    haveRebound: boolean,
    secondPriceIsInputed: boolean,
    highestPricePosition?: {
      firstPeriodPricePosition: number,
      firstPeriodPriceMulti: number,

      secondPeriodPricePosition: number,
      secondPeriodPriceMulti: number,

      thirdPeriodPricePosition: number,
      thirdPeriodPriceMulti: number,

      forthPeriodPricePosition: number,
      forthPeriodPriceMulti: number,
    }
  } {
    const priceMultiWithOriginPrice = this.getPriceMultiWithOriginPrice(prices);

    const priceRatios = this.getPricesRatios(prices);
    
    const reboundPosition = this.getPositionOfReboundInPriceRatios(priceRatios);
    const haveRebound = reboundPosition !== -1;

    const firstPeriodPricePosition = reboundPosition;
    const firstPeriodPriceMulti = priceMultiWithOriginPrice[firstPeriodPricePosition];

    const secondPeriodPricePosition = reboundPosition + 1;
    const secondPeriodPriceMulti = priceMultiWithOriginPrice[secondPeriodPricePosition];

    const thirdPeriodPricePosition = reboundPosition + 2;
    const thirdPeriodPriceMulti = priceMultiWithOriginPrice[thirdPeriodPricePosition];

    const forthPeriodPricePosition = reboundPosition + 3;
    const forthPeriodPriceMulti = priceMultiWithOriginPrice[forthPeriodPricePosition];

    const secondPriceIsInputed = haveRebound && secondPeriodPriceMulti >= 1;
    console.log(priceRatios, reboundPosition);

    if(!haveRebound) {
      return ({
        haveRebound,
        secondPriceIsInputed,
        highestPricePosition: undefined
      });
    }

    return ({
      haveRebound,
      secondPriceIsInputed,
      highestPricePosition: {
        firstPeriodPricePosition,
        firstPeriodPriceMulti,

        secondPeriodPriceMulti,
        secondPeriodPricePosition,

        thirdPeriodPricePosition,
        thirdPeriodPriceMulti,

        forthPeriodPricePosition,
        forthPeriodPriceMulti,
      }
    });
  }

  static checkIsNoReboundBeforeLastPosition(prices: number[]) {
    const priceRatios = this.getPricesRatios(prices);
    const pricesBeforeLastCheck = prices.slice(0, lastCheckReboundPosition);
    const priceRatiosBeforeLastCheck = priceRatios.slice(0, lastCheckReboundPosition);

    const isAllPricesBeforeLastCheckAreHaveValues = this.checkPricesAreAllBiggerThanZero(pricesBeforeLastCheck);
    const reboundPositionBeforeLastCheck = this.getPositionOfReboundInPriceRatios(priceRatiosBeforeLastCheck);

    const noReboundBeforeLastCheck = 
      isAllPricesBeforeLastCheckAreHaveValues &&
      reboundPositionBeforeLastCheck === -1;
    
    return noReboundBeforeLastCheck;
  }

  static getThirdOrForthKabuTrendType(prices: number[]): KabuTrendsAndHighestPricePosition {
    const {
      secondPriceIsInputed,
      highestPricePosition,
    } = this.getReboundAndHighestPricePosition(prices);

    if(secondPriceIsInputed && highestPricePosition) {
      const {
        secondPeriodPriceMulti,
        thirdPeriodPricePosition,
        forthPeriodPricePosition,
      } = highestPricePosition;
      
      if(secondPeriodPriceMulti < reboundTrendSeperatingMulti) {
        return ({
          kabuTrendTypes: ['forth'],
          highestPricePosition: forthPeriodPricePosition
        });
      } else {
        return ({
          kabuTrendTypes: ['third'],
          highestPricePosition: thirdPeriodPricePosition
        });
      }
    }

    return ({
      kabuTrendTypes: ['third', 'forth'],
      highestPricePosition: undefined,
    });
  }

  static getWaveOrThirdOrForthKabuTrendType(prices: number[], kabuValue: number | string): KabuTrendsAndHighestPricePosition {
    const K = Number(kabuValue);
    if(K > 100) {
      return this.getThirdOrForthKabuTrendType(prices);
    }
    return ({
      kabuTrendTypes: ['wave'],
      highestPricePosition: undefined,
    });
  }

  static getWaveOrForthKabuTrendType(prices: number[]): KabuTrendsAndHighestPricePosition {
    const pricesBeforeLastCheck = prices.slice(0, lastCheckReboundPosition);
    const priceRatios = this.getPricesRatios(pricesBeforeLastCheck);

    const {
      secondPriceIsInputed,
      highestPricePosition,
    } = this.getReboundAndHighestPricePosition(pricesBeforeLastCheck);

    if(secondPriceIsInputed && highestPricePosition) {
      const {
        forthPeriodPriceMulti,
        forthPeriodPricePosition
      } = highestPricePosition;

      const isForthPeriod = 
        forthPeriodPriceMulti > 1.4 && 
        forthPeriodPriceMulti <= 2;
      
      if(isForthPeriod) {
        return ({
          kabuTrendTypes: ['forth'],
          highestPricePosition: forthPeriodPricePosition
        });
      }
    
      //check is no rebound
      const isNoReboundBeforeLastCheck = this.checkIsNoReboundBeforeLastPosition(prices);
      //check have rebound but forth price is smaller than reboundTrendSeperatingMulti
      const isForthPriceMultiSmallerThanReboundTrendSeperatingMulti = 
        priceRatios[forthPeriodPricePosition] > 0 &&
        forthPeriodPriceMulti < reboundTrendSeperatingMulti;
      console.log(priceRatios, priceRatios[forthPeriodPricePosition], forthPeriodPriceMulti);
    
      if(isNoReboundBeforeLastCheck || isForthPriceMultiSmallerThanReboundTrendSeperatingMulti) {
        return ({
          kabuTrendTypes: ['wave'],
          highestPricePosition: undefined
        });
      }
    }

    return ({
      kabuTrendTypes: ['forth', 'wave'],
      highestPricePosition: undefined
    });
  }

  static getDecrementOrThirdOrForthKabuTrendsAndPricePosition(prices: number[], kabuTrendTypes: KabuTrendType[]): KabuTrendsAndHighestPricePosition {
    const {
      haveRebound,
    } = this.getReboundAndHighestPricePosition(prices);

    //check is decrement first
    const isReboundBeforeLastCheck = this.checkIsNoReboundBeforeLastPosition(prices);
    if(isReboundBeforeLastCheck) {
      return ({
        kabuTrendTypes: ['decrement'],
        highestPricePosition: noReboundPosition,
      });
    }

    //maybe decrement / third / forth
    const haveDecrementKabuTrendType = kabuTrendTypes.includes('decrement');
    if(haveDecrementKabuTrendType && !haveRebound) {
      return ({
        kabuTrendTypes: ['third', 'forth', 'decrement'],
        highestPricePosition: undefined
      });
    }
     
    //check is third / forth
    return this.getThirdOrForthKabuTrendType(prices);
  }

  static getForthKabuTrendsAndPricePosition(prices: number[]): KabuTrendsAndHighestPricePosition {
    const {
      haveRebound,
      highestPricePosition,
    } = this.getReboundAndHighestPricePosition(prices);

    if(haveRebound && highestPricePosition) {
      return ({
        kabuTrendTypes: ['forth'],
        highestPricePosition: highestPricePosition.forthPeriodPricePosition
      });
    }

    return ({
      kabuTrendTypes: ['forth'],
      highestPricePosition: undefined
    });
  }

  static getPresiceTrendType(prices: number[]): KabuTrendsAndHighestPricePosition {
    const priceMultiWithOriginPrice = this.getPriceMultiWithOriginPrice(prices);
    const priceRatios = this.getPricesRatios(prices);
    //rebound is first
    const reboundPosition = this.getPositionOfReboundInPriceRatios(priceRatios);
    console.log(priceMultiWithOriginPrice, priceRatios, reboundPosition);

    const KabuValue = handleCalKabu(prices[0], prices[1]);
    const typesFromKabuValue = this.getKabuTrendPredictionsFromKabuValue(KabuValue);

    //check forth
    const isForth = 
      typesFromKabuValue.includes('forth') && 
      typesFromKabuValue.length === 1;
    
    if(isForth) {
      return this.getForthKabuTrendsAndPricePosition(prices);
    }

    //check is wave / third / forth
    const isWaveOrThirdOrForth = 
      typesFromKabuValue.includes('third') && 
      typesFromKabuValue.includes('forth') && 
      typesFromKabuValue.includes('wave');
    if(isWaveOrThirdOrForth) {
      return this.getWaveOrThirdOrForthKabuTrendType(prices, KabuValue);
    }

    //check is forth / wave
    const isWaveOrForth = 
      typesFromKabuValue.includes('wave') && 
      typesFromKabuValue.includes('forth') && 
      typesFromKabuValue.length === 2;

    if(isWaveOrForth) {
      return this.getWaveOrForthKabuTrendType(prices);
    }
    
    //check is third or forth
    const isDecrementOrThirdOrForth = 
      typesFromKabuValue.includes('third') && 
      typesFromKabuValue.includes('forth') && 
      typesFromKabuValue.includes('decrement');

    if(isDecrementOrThirdOrForth) {
      return this.getDecrementOrThirdOrForthKabuTrendsAndPricePosition(prices, typesFromKabuValue);
    }

    //last get basic default types from KabuValue
    return ({
      kabuTrendTypes: typesFromKabuValue,
      highestPricePosition: undefined,
    });
  }
}

export default HandleKabuTrends;