import React from 'react';
import { Box, Typography, Divider, makeStyles } from '@material-ui/core';
import { AnnouncementItemProps } from './types';
import texts from '../static/lang/texts.json';
import HighlightTextHandler from '../functions/HighlightTextHandler';
import GetFormattedTextByType from '../functions/getFormattedTextByType';


console.log(HighlightTextHandler.splitTextWithRegExp('<h>ccaak</h>ccbb<h>dcaa</h><h>bcaaa</h>'));

const annoucementContents = [
  texts['zh_TW']['announcement.1'],
  texts['zh_TW']['announcement.2'],
];

export const AnnouncementItem = (props: AnnouncementItemProps) => {
  const formatedTextList = HighlightTextHandler.splitTextWithRegExp(props.content);

  return (
    <Box paddingTop={1}>
      <Typography>
        {`${props.index + 1}. `}
        {formatedTextList.map(GetFormattedTextByType)}
      </Typography>
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 600,
    color: theme.palette.primary.dark,
  },
  root: {
    // backgroundColor: theme.palette.primary.dark,
    // color: '#fff',
    borderRadius: 10,
  }
}));

const Announcements = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root} padding={1}>
      <Typography variant={'h6'} className={classes.title}>
        {'注意事項'}
      </Typography>
      <Divider />
      <Box>
        {annoucementContents.map((a, index) => (
          <AnnouncementItem
            index={index}
            content={a} />
        ))}
      </Box>
    </Box>
  );
};

export default Announcements;
