import React from 'react';
import { Box, Typography, Divider, makeStyles } from '@material-ui/core';
import { KabuTrendTypePredictionProps } from './types';
import { kabuTrends, highestPositionToText, getHighestPositionText } from '../config';

const useStyles = makeStyles(theme => ({
  root: {
    borderColor: theme.palette.primary.dark,
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderRadius: 10,
  }
}));

const KabuTrendTypePrediction = (props: KabuTrendTypePredictionProps) => {
  const classes = useStyles();
  const trendsStr = props.kabuTrendTypes.map(
    trend => kabuTrends[trend]
  ).join(' / ');

  console.log(props.highestPricePosition);
  
  return (
    <Box className={classes.root} padding={1}>
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