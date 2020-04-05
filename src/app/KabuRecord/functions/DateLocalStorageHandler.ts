import { storedDateLocalStorageKey } from "../config";
import KabuFormDateHandler from "./KabuFormDateHandler";

class DateLocalStorageHandler {
  static getData() {
    const dateStr = localStorage.getItem(storedDateLocalStorageKey);
    if(dateStr) {
      return new Date(dateStr);
    }
  }

  static setData(date: string | Date) {
    const dateStr = date.toString();
    localStorage.setItem(storedDateLocalStorageKey, dateStr);
  }

  static checkIsNewWeek() {
    const storedDate = this.getData();
    const today = new Date();
    const thisWeekSunday = KabuFormDateHandler.getThisWeekSunday(today);
    const storedDateNotEqualToThisWeekSunday = !storedDate || (
      storedDate.toLocaleDateString() !== thisWeekSunday.toLocaleDateString()
    );
    return storedDateNotEqualToThisWeekSunday;
  }

  static storeThisWeekSunday() {
    const today = new Date();
    const thisWeekSunday = KabuFormDateHandler.getThisWeekSunday(today);
    this.setData(thisWeekSunday);
  }
}

export default DateLocalStorageHandler;