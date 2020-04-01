import React from 'react';
import { Box } from '@material-ui/core';
import OtherDayKabuItemHeader from './OtherDayKabuItemHeader';
import { OtherDayKabuFormProps } from './types';
import OtherDayKabuItem from './OtherDayKabuItem';

const OtherDayKabuForm = (props: OtherDayKabuFormProps) => {
  return (
    <Box>
      <OtherDayKabuItemHeader />
      {props.otherDayList.map((d, i) => (
        <OtherDayKabuItem
          key={i}
          {...d}
          onChange={props.onChange} />
      ))}
    </Box>
  );
};

export default OtherDayKabuForm;