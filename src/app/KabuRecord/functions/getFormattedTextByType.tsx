import React from 'react';
import { FormattedText } from '../types';
import { Typography, makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    // borderWidth: '0px 0px 2.5px 0px',
    // borderColor: theme.palette.primary.dark,
    // borderStyle: 'solid',
    padding: theme.spacing(0.2),
    borderRadius: theme.spacing(0.2),
  }
}));

const GetFormattedTextByType = (formatedText: FormattedText, index: number) => {
  const classes = useStyles();
  
  switch (formatedText.type) {
  case 'highlight': {
    return (
      <Box
        key={index}
        component={'span'}
        className={classes.root}
      >
        {formatedText.content}
      </Box>
    );
  }
  case 'normal': {
    return (
      <Box
        key={index}
        component={'span'}
      >
        {formatedText.content}
      </Box>
    );
  }
  default:
    return <></>;
  }
};

export default GetFormattedTextByType;