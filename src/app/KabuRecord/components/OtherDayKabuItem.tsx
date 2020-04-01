import React from 'react';
import { Box, ListItem, ListItemText, Grid } from '@material-ui/core';
import { OtherDayKabuItemProps } from './types';
import InputItemContainer from '../containers/InputItemContainer';
import CommonGridListItemWrapper from 'components/commonComponents/CommonGridListItem/CommonGridListItemWrapper';
import { otherDayKabuItemWidthRatios } from '../config';

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
        {`${date || ''}(${day})`}
      </ListItemText>
      <InputItemContainer
        id={`${day}-${'morning'}`}
        day={day}
        dayTime={'morning'}
        value={String(dayTimePrices.morning)}
        onChange={props.onChange} />
      <InputItemContainer
        id={`${day}-${'afternoon'}`}
        day={day}
        dayTime={'afternoon'}
        value={String(dayTimePrices.afternoon)}
        onChange={props.onChange} />
    </CommonGridListItemWrapper>
  );
};

export default OtherDayKabuItem;