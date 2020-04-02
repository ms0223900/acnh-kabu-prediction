import React, { useCallback } from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import HandleLocalStorage from '../functions/HandleLocalStorage';
import { ResetButtonContainerProps } from './types';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  }
}));

const ResetButtonContainer = (props: ResetButtonContainerProps) => {
  const classes = useStyles();

  const handleResetPrices = useCallback(() => {
    if(window.confirm('確定重設本周所有價格嗎?')) {
      HandleLocalStorage.reset();
      props.resetPricesFn();
    }
  }, [props]);
  
  return (
    <Button 
      className={classes.root}
      onClick={handleResetPrices}
    >
      {'重設本周所有價格'}
    </Button>
  );
};

export default ResetButtonContainer;