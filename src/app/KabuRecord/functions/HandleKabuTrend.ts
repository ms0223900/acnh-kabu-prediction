import { KabuTrendType, SingleWeekKabuRecord } from "../types";
import handleCalKabu from "./handleCalKabu";

const reboundTrendSeperatingMulti = 1.4;
export const noReboundPosition = -1000;
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
    if(K >= 91) {
      return ['wave', 'forth'];
    }
    else if(K >= 85) {
      return ['third', 'forth', 'decrement'];
    } 
    else if(K >= 80) {
      return ['third', 'forth'];
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
      if(i === 0 || i === 1) {
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
      if(ratio > 0 && i > 0) {
        //if ratio is bigger than 0, it is not a decrement type
        position = i;
        break;
      }
    }

    return position;
  }

  static getPresiceTrendType(prices: number[]): {
    kabuTrendTypes: KabuTrendType[]
    highestPricePosition: undefined | number
  } {
    const priceMultiWithOriginPrice = this.getPriceMultiWithOriginPrice(prices);
    const priceRatios = this.getPricesRatios(prices);
    //rebound is first
    const reboundPosition = this.getPositionOfReboundInPriceRatios(priceRatios);
    console.log(priceMultiWithOriginPrice, priceRatios, reboundPosition);

    const KabuValue = handleCalKabu(prices[0], prices[1]);
    const typesFromKabuValue = this.getKabuTrendPredictionsFromKabuValue(KabuValue);

    const secondPeriodPricePosition = reboundPosition + 1;
    const secondPeriodPriceMulti = priceMultiWithOriginPrice[secondPeriodPricePosition];

    const thirdPeriodHighestPricePosition = reboundPosition + 2;
    const thirdPeriodHighestPriceMulti = priceMultiWithOriginPrice[thirdPeriodHighestPricePosition];

    const forthPeriodHighestPricePosition = reboundPosition + 3;
    const forthPeriodHighestPriceMulti = priceMultiWithOriginPrice[forthPeriodHighestPricePosition];

    //check decrement first(last position is thu afternoon)
    const checkDecrementPriceRatios = priceRatios.slice(0, lastCheckReboundPosition);
    const reboundPositionForCheckDecrement = this.getPositionOfReboundInPriceRatios(checkDecrementPriceRatios);

    const isDecrement = 
      this.checkPricesAreAllBiggerThanZero(prices.slice(0, lastCheckReboundPosition)) &&
      reboundPositionForCheckDecrement === -1;
    if(isDecrement) {
      return ({
        kabuTrendTypes: ['decrement'],
        highestPricePosition: noReboundPosition,
      });
    }

    //check forth
    const isForth = 
      typesFromKabuValue.includes('forth') && 
      typesFromKabuValue.length === 1;
    if(isForth) {
      //not have rebound yet
      if(reboundPosition === -1) {
        return ({
          kabuTrendTypes: ['forth'],
          highestPricePosition: undefined
        });
      }
      return ({
        kabuTrendTypes: ['forth'],
        highestPricePosition: forthPeriodHighestPricePosition
      });
    }

    //check is wave / third / forth

    //check is forth or wave
    const isWaveOrForth = 
      typesFromKabuValue.includes('wave') && 
      typesFromKabuValue.includes('forth');

    if(isWaveOrForth) {
      const isForthPeriod = 
        forthPeriodHighestPriceMulti > 1.5 && 
        forthPeriodHighestPriceMulti <= 2;
      
      const noReboundBeforeLastCheck = reboundPositionForCheckDecrement === -1;

      if(isForthPeriod) {
        return ({
          kabuTrendTypes: ['forth'],
          highestPricePosition: forthPeriodHighestPricePosition
        });
      }

      const checkForthPriceRatioIsSmallerThanReboundTrendSeperatingMulti = priceMultiWithOriginPrice[forthPeriodHighestPricePosition] < reboundTrendSeperatingMulti;
      console.log(priceRatios, priceMultiWithOriginPrice, priceRatios[forthPeriodHighestPricePosition]);

      if(noReboundBeforeLastCheck || checkForthPriceRatioIsSmallerThanReboundTrendSeperatingMulti) {
        return ({
          kabuTrendTypes: ['wave'],
          highestPricePosition: undefined
        });
      }
      return ({
        kabuTrendTypes: ['forth', 'wave'],
        highestPricePosition: undefined
      });
    }
    
    //check is third or forth
    const isThirdOrForth = 
      typesFromKabuValue.includes('third') && 
      typesFromKabuValue.includes('forth');

    if(isThirdOrForth) {
      if(reboundPosition !== -1) {
        if(secondPeriodPriceMulti > 1) {
          if(secondPeriodPriceMulti < reboundTrendSeperatingMulti) {
            return ({
              kabuTrendTypes: ['forth'],
              highestPricePosition: forthPeriodHighestPricePosition
            });
          } else {
            return ({
              kabuTrendTypes: ['third'],
              highestPricePosition: thirdPeriodHighestPricePosition
            });
          }
        }
        return ({
          kabuTrendTypes: ['third', 'forth'],
          highestPricePosition: undefined
        });
      }
    }

    //last get types from KabuValue
    return ({
      kabuTrendTypes: typesFromKabuValue,
      highestPricePosition: undefined,
    });
  }

  
  // static checkHaveDecrement(prices: number[]) {
  //   let res = false;
  //   for (let i = 0; i < prices.length; i++) {
  //     const price = prices[i];
  //     const priceNext = prices[i + 1];
  //     if(priceNext - price < 0) {

  //     }
  //   }
  // }
}

export default HandleKabuTrends;