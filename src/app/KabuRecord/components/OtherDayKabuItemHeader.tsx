import React from 'react';
import { Box, ListItem, ListItemText } from '@material-ui/core';
import CommonGridListItemWrapper from 'components/commonComponents/CommonGridListItem/CommonGridListItemWrapper';
import { otherDayKabuItemWidthRatios } from '../config';

const OtherDayKabuItemHeader = () => {
  return (
    <CommonGridListItemWrapper
      widthRatios={otherDayKabuItemWidthRatios}
    >
      <ListItemText>
        {'日期'}
      </ListItemText>
      <ListItemText>
        {'上午(8:00~11:59)'}
      </ListItemText>
      <ListItemText>
        {'下午(12:00~22:00)'}
      </ListItemText>
    </CommonGridListItemWrapper>
  );
};

export default OtherDayKabuItemHeader;