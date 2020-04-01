import React from 'react';
import { Box, ListItem, Grid } from '@material-ui/core';
import { CommonGridListItemWrapperProps } from './types';

const CommonGridListItemWrapper = (props: CommonGridListItemWrapperProps) => {
  return (
    <ListItem>
      <Grid container>
        {props.widthRatios.map((w, i) => (
          <Grid item xs={w} key={i}>
            {props.children[i]}
          </Grid>
        ))}
      </Grid>
    </ListItem>
  );
};

export default CommonGridListItemWrapper;