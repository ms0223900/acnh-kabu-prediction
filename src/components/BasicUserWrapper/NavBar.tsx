import React from 'react';
import { Box, makeStyles, Paper } from '@material-ui/core';
import { NavBarProps } from './types';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // backgroundColor: theme.palette.primary.light,
    minHeight: theme.spacing(4),
    boxShadow: '0px 3px 10px #ddd',
  },

}));

const NavBar = (props: NavBarProps) => {
  const classes = useStyles();
  return (
    <nav>
      <Box position={'sticky'} padding={1} className={classes.root}>
        {props.children}
      </Box>
    </nav>
  );
};

export default NavBar;