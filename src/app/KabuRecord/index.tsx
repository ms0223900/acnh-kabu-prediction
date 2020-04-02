import React from 'react';
import { OtherDayKabuFormContainerProps } from './containers/types';
import OtherDayKabuFormContainer from './containers/OtherDayKabuFormContainer';
import HandleLocalStorage from './functions/HandleLocalStorage';
import Header from './components/Header';
import Footer from './components/Footer';
import { Box } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import anclTheme from './theme/theme';

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
    <ThemeProvider theme={anclTheme}>
      <Header />
      <Box style={{
        minHeight: '100vh'
      }}>
        <OtherDayKabuFormContainer
          initOtherDayPrices={HandleLocalStorage.getData()} />
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default KabuRecord;