import DateLocalStorageHandler from "./DateLocalStorageHandler";

class KabuFormDateHandler {
  static thisWeekSundayDate = ''
  static weekStrJoinSymbol = ' ~ '

  static getThisWeekSunday(today: Date) {
    const todayDay = today.getDay();
    const thisWeekSunday = new Date(today.setDate(today.getDate() - todayDay));  
    return thisWeekSunday;
  }

  static getThisWeekOtherDayFromSunday(thisWeekSunday: Date, next: number) {
    const _thisWeekSunday = new Date(thisWeekSunday);
    const otherDay = new Date(
      _thisWeekSunday.setDate(_thisWeekSunday.getDate() + next)
    );  
    return otherDay;
  }

  static getThisWeekSaturdayFromSunday(thisWeekSunday: Date) {
    const thisWeekSaturday = this.getThisWeekOtherDayFromSunday(thisWeekSunday, 6);  
    return thisWeekSaturday;
  }

  static getThisWeekFromToDatesWithStoredDate() {
    const storedSundayDate = DateLocalStorageHandler.getData();
    if(storedSundayDate) {
      const thisWeekSaturday = this.getThisWeekSaturdayFromSunday(storedSundayDate);
      return [
        storedSundayDate,
        thisWeekSaturday,
      ];
    }
    return [];
  }

  static convertDatesToJoinedStr(dates: Date[]) {
    if(dates.length > 0) {
      return dates
        .map(d => (
          `${d.getMonth() + 1}/${d.getDate()}`
        ))
        .join(this.weekStrJoinSymbol);
    }
    return '';
  }
}

export default KabuFormDateHandler;