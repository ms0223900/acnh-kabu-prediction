import React from 'react';
import { Box, ListItem, ListItemText, Grid } from '@material-ui/core';
import { OtherDayKabuItemProps } from './types';
import InputItemContainer from '../containers/InputItemContainer';
import CommonGridListItemWrapper from 'components/commonComponents/CommonGridListItem/CommonGridListItemWrapper';
import { otherDayKabuItemWidthRatios, otherDaysText_zhTw } from '../config';

const OtherDayKabuItem = (props: OtherDayKabuItemProps) => {
  const {
    date,
    day,
    dayTimePrices,
  } = props;

  return (
    <CommonGridListItemWrapper
      widthRatios={otherDayKabuItemWidthRatios}
    >
      <ListItemText>
        {`${date || ''}${otherDaysText_zhTw[day]}`}
      </ListItemText>
      <Box paddingLeft={0.5}>
        <InputItemContainer
          id={`${day}-${'morning'}`}
          day={day}
          dayTime={'morning'}
          value={String(dayTimePrices.morning)}
          onChange={props.onChange} />
      </Box>
      <Box paddingLeft={0.5}>
        <InputItemContainer
          id={`${day}-${'afternoon'}`}
          day={day}
          dayTime={'afternoon'}
          value={String(dayTimePrices.afternoon)}
          onChange={props.onChange} />
      </Box>
    </CommonGridListItemWrapper>
  );
};

export default OtherDayKabuItem;