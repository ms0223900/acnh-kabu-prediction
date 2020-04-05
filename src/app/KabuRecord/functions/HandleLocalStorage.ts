import { OtherDayKabuFormContainerProps } from "../containers/types";
import { localStorageKey, storedDateLocalStorageKey } from "../config";

export const initDayPrices = {
  'morning': 0,
  'afternoon': 0,
};

export const defaultInitOtherDayPrices: OtherDayKabuFormContainerProps['initOtherDayPrices'] = {
  'sun': initDayPrices,
  'mon': initDayPrices,
  'tue': initDayPrices,
  'wed': initDayPrices,
  'thu': initDayPrices,
  'fri': initDayPrices,
  'sat': initDayPrices,
};

class HandleLocalStorage {
  static getData() {
    const data = localStorage.getItem(localStorageKey);
    if(data) {
      const parsed = JSON.parse(data);
      console.log(parsed);
      return parsed as OtherDayKabuFormContainerProps['initOtherDayPrices'];
    }
    return defaultInitOtherDayPrices;
  }
  
  static reset() {
    localStorage.setItem(localStorageKey, '');
    localStorage.setItem(storedDateLocalStorageKey, '');
  }
}

export default HandleLocalStorage;