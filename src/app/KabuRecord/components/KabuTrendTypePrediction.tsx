import React from 'react';
import { Box, Typography, Divider } from '@material-ui/core';
import { KabuTrendTypePredictionProps } from './types';
import { kabuTrends, highestPositionToText, getHighestPositionText } from '../config';

const KabuTrendTypePrediction = (props: KabuTrendTypePredictionProps) => {
  const trendsStr = props.kabuTrendTypes.map(
    trend => kabuTrends[trend]
  ).join(' / ');

  console.log(props.highestPricePosition);
  
  return (
    <Box>
      <Box display={'flex'} alignItems={'center'} paddingTop={1} paddingBottom={1}>
        <Typography>
          {'目前可能趨勢: '}
        </Typography>
        <Typography variant={'h6'}>
          {`${trendsStr}`}
        </Typography>
      </Box>
      <Divider />
      <Box display={'flex'} alignItems={'center'} paddingTop={1} paddingBottom={1}>
        <Typography>
          {'預測價格最大值時間: '}
        </Typography>
        <Typography variant={'h5'}>
          {`${getHighestPositionText(props.highestPricePosition)}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default KabuTrendTypePrediction;