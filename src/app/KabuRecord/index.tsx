import React from 'react';
import { OtherDayKabuFormContainerProps } from './containers/types';
import OtherDayKabuFormContainer from './containers/OtherDayKabuFormContainer';
import HandleLocalStorage from './functions/HandleLocalStorage';

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

const KabuRecord = () => {
  return (
    <OtherDayKabuFormContainer
      initOtherDayPrices={HandleLocalStorage.getData()} />
  );
};

export default KabuRecord;