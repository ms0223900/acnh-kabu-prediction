import React from 'react';
import { Box, Paper, Divider } from '@material-ui/core';
import OtherDayKabuItemHeader from './OtherDayKabuItemHeader';
import { OtherDayKabuFormProps } from './types';
import OtherDayKabuItem from './OtherDayKabuItem';

const OtherDayKabuForm = (props: OtherDayKabuFormProps) => {
  return (
    <Box paddingY={1}>
      <Paper elevation={2}>
        <OtherDayKabuItemHeader />
        <Divider />
        {props.otherDayList.map((d, i) => (
          <OtherDayKabuItem
            key={i}
            {...d}
            onChange={props.onChange} />
        ))}
      </Paper>
    </Box>
  );
};

export default OtherDayKabuForm;