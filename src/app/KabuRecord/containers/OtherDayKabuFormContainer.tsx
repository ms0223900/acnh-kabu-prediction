import React, { useState, useCallback, useEffect } from 'react';
import { Box, Divider, Typography, Container } from '@material-ui/core';
import OtherDayKabuForm from '../components/OtherDayKabuForm';
import { DayAndTime, SingleWeekKabuRecord, OtherDayType, SingleOtherDayPrices } from '../types';
import InputItemContainer from './InputItemContainer';
import handleCalKabu from '../functions/handleCalKabu';
import { OtherDayKabuFormContainerProps } from './types';
import { localStorageKey } from '../config';
import KabuTrendTypePrediction from '../components/KabuTrendTypePrediction';
import HandleKabuTrends from '../functions/HandleKabuTrend';
import ResetButtonContainer from './ResetButtonContainer';
import { defaultInitOtherDayPrices } from '..';
import DateLocalStorageHandler from '../functions/DateLocalStorageHandler';
import texts from '../static/lang/texts.json';
import KabuFormDateHandler from '../functions/KabuFormDateHandler';
import HandleLocalStorage from '../functions/HandleLocalStorage';

export const otherDaysArr: OtherDayType[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const OtherDayKabuFormContainer = (props: OtherDayKabuFormContainerProps) => {
  const [dayPrices, setDayPrices] = useState(props.initOtherDayPrices);
  const [fromToDatesStr, setDatesStr] = useState(texts['zh_TW']['fromToDates.default']);

  const handleChange = useCallback((dayAndTime: DayAndTime, value: string) => {
    setDayPrices(d => ({
      ...d,
      [dayAndTime.day]: {
        ...d[dayAndTime.day],
        [dayAndTime.dayTime]: Number(value),
      }
    }));
  }, []);

  const handleResetPricesAndDate = useCallback(() => {
    HandleLocalStorage.reset();
    setDayPrices(defaultInitOtherDayPrices);
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(dayPrices));

    
  }, [dayPrices]);

  useEffect(() => {
    const isNewWeek = DateLocalStorageHandler.checkIsNewWeek();
    if(isNewWeek) {
      handleResetPricesAndDate();
      DateLocalStorageHandler.storeThisWeekSunday();
    }
    //set week from to dates
    const thisWeekFromToDates = KabuFormDateHandler.getThisWeekFromToDatesWithStoredDate();
    const thisWeekFromToDatesStr = KabuFormDateHandler.convertDatesToJoinedStr(thisWeekFromToDates);
    setDatesStr(thisWeekFromToDatesStr);
  }, [handleResetPricesAndDate]);

  //excludes sunday
  const days = otherDaysArr;
  const otherDayList = days.map(day => ({
    day,
    dayTimePrices: dayPrices[day]
  }));

  const prices = HandleKabuTrends.getThisWeekPrices(dayPrices);
  const kabuTrendTypesAndPricePosition = HandleKabuTrends.getPresiceTrendType(prices);

  return (
    <Container>
      <Box>
        <Typography variant={'h6'}>
          {`${fromToDatesStr}`}
        </Typography>
        <Divider />
        <Typography variant={'h6'}>
          {'週日原買價'}
        </Typography>
        <InputItemContainer
          id={'sunday-morning'}
          day={'sun'}
          dayTime={'morning'}
          variant={'outlined'}
          onChange={handleChange}
          value={String(dayPrices.sun.morning)} />
      </Box>
      <OtherDayKabuForm
        otherDayList={otherDayList}
        onChange={handleChange} />
      <KabuTrendTypePrediction
        prices={prices}
        {...kabuTrendTypesAndPricePosition} />
      <Box paddingTop={1} textAlign={'center'}>
        <ResetButtonContainer
          resetPricesFn={handleResetPricesAndDate} />
      </Box>
    </Container>
  );
};

export default OtherDayKabuFormContainer;