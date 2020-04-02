import { GridRatio } from "common-types";
import { KabuTrendType, OtherDayType, DayTimeType } from "./types";
import { noReboundPosition } from "./functions/HandleKabuTrend";

export const reportDocLink = 'https://docs.google.com/document/d/1LooeZ1qIbQnKRFvIcF6-a1RbbtA9UPt7gIBLnB2Gnp4/edit?usp=sharing';
export const localStorageKey = 'KabuForm';

export const otherDayKabuItemWidthRatios = [2, 5, 5] as GridRatio[];

export const kabuTrends: {
  [t in KabuTrendType]: string
} = {
  notDefined: '資料不足',
  decrement: '遞減型',
  wave: '波型(最大價格1.1 ~ 1.5倍)',
  third: '三期型(最大價格約2 ~ 6倍)',
  forth: '四期型(最大價格約1.4 ~ 2倍)',
};

export const positionUndefinedText_zhTw = '價格尚不足/可能為波型，無法預測最大值時間';
export const decrement_zhTw = '此為遞減型，不會有最大值，可以準備脫手賣掉了';

export const otherDaysText_zhTw: {
  [day in OtherDayType]: string
} = {
  sun: '星期日',
  mon: '星期一',
  tue: '星期二',
  wed: '星期三',
  thu: '星期四',
  fri: '星期五',
  sat: '星期六',
};

export const dayTimesText_zhTw: {
  [dayTime in DayTimeType]: string
} = {
  morning: '上午(8:00~11:59)',
  afternoon: '下午(12:00~22:00)'
};

export const highestPositionToText: {
  [x: number]: string
} = {
  0: `${otherDaysText_zhTw.sun} ${dayTimesText_zhTw.morning}`,

  1: `${otherDaysText_zhTw.mon} ${dayTimesText_zhTw.morning}`,
  2: `${otherDaysText_zhTw.mon} ${dayTimesText_zhTw.afternoon}`,

  3: `${otherDaysText_zhTw.tue} ${dayTimesText_zhTw.morning}`,
  4: `${otherDaysText_zhTw.tue} ${dayTimesText_zhTw.afternoon}`,

  5: `${otherDaysText_zhTw.wed} ${dayTimesText_zhTw.morning}`,
  6: `${otherDaysText_zhTw.wed} ${dayTimesText_zhTw.afternoon}`,

  7: `${otherDaysText_zhTw.thu} ${dayTimesText_zhTw.morning}`,
  8: `${otherDaysText_zhTw.thu} ${dayTimesText_zhTw.afternoon}`,

  9: `${otherDaysText_zhTw.fri} ${dayTimesText_zhTw.morning}`,
  10: `${otherDaysText_zhTw.fri} ${dayTimesText_zhTw.afternoon}`,

  11: `${otherDaysText_zhTw.sat} ${dayTimesText_zhTw.morning}`,
  12: `${otherDaysText_zhTw.sat} ${dayTimesText_zhTw.afternoon}`,
};

export const getHighestPositionText = (position: number | undefined): string => {
  if(position === noReboundPosition) {
    return decrement_zhTw;
  }
  if(typeof position === 'undefined') {
    return positionUndefinedText_zhTw; 
  } else {
    return highestPositionToText[position];
  }
  
};

