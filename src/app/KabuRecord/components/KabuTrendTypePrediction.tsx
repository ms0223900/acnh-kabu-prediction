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
      <Box display={'flex'} alignItems={'center'}>
        <Typography>
          {'目前可能趨勢: '}
        </Typography>
        <Typography variant={'h6'}>
          {`${trendsStr}`}
        </Typography>
      </Box>
      <Divider />
      <Typography>
        {`價格最大值時間: ${
          getHighestPositionText(props.highestPricePosition)
        }`}
      </Typography>
    </Box>
  );
};

export default KabuTrendTypePrediction;