import React, { useState, useCallback, useEffect } from 'react';
import { Box, Divider, Typography } from '@material-ui/core';
import OtherDayKabuForm from '../components/OtherDayKabuForm';
import { DayAndTime, SingleWeekKabuRecord, OtherDayType } from '../types';
import InputItemContainer from './InputItemContainer';
import handleCalKabu from '../functions/handleCalKabu';
import { OtherDayKabuFormContainerProps } from './types';
import { localStorageKey } from '../config';
import KabuTrendTypePrediction from '../components/KabuTrendTypePrediction';
import HandleKabuTrends from '../functions/HandleKabuTrend';

const OtherDayKabuFormContainer = (props: OtherDayKabuFormContainerProps) => {
  let Kabu: number | string = 0;
  const [dayPrices, setDayPrices] = useState(props.initOtherDayPrices);

  const handleChange = useCallback((dayAndTime: DayAndTime, value: string) => {
    setDayPrices(d => ({
      ...d,
      [dayAndTime.day]: {
        ...d[dayAndTime.day],
        [dayAndTime.dayTime]: Number(value),
      }
    }));
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(dayPrices));
  }, [dayPrices]);

  //excludes sunday
  const days = Object.keys(dayPrices).slice(1) as OtherDayType[];
  const otherDayList = days.map(day => ({
    day,
    dayTimePrices: dayPrices[day]
  }));

  Kabu = handleCalKabu(dayPrices.sun.morning, dayPrices.mon.morning);
  const prices = HandleKabuTrends.getThisWeekPrices(dayPrices);
  const kabuTrendTypesAndPricePosition = HandleKabuTrends.getPresiceTrendType(prices);

  return (
    <>
      <Typography>{'Sunday price'}</Typography>
      <InputItemContainer
        id={'sunday-morning'}
        day={'sun'}
        dayTime={'morning'}
        onChange={handleChange}
        value={String(dayPrices.sun.morning)} />
      <Divider />
      <OtherDayKabuForm
        otherDayList={otherDayList}
        onChange={handleChange} />
      <Divider />
      <Typography variant={'h5'}>
        {`Kabu值(%): ${Kabu}`}
      </Typography>
      <KabuTrendTypePrediction
        {...kabuTrendTypesAndPricePosition} />
    </>
  );
};

export default OtherDayKabuFormContainer;