import React from 'react';
import { Box, Avatar, Typography, Button } from '@material-ui/core';
import { UserProps } from './types';

const User = (props: UserProps) => {
  return (
    <Button>
      <Box display={'flex'} alignItems={'center'}>
        <Avatar src={props.userImageUrl}>
          {props.name.charAt(0).toUpperCase()}
        </Avatar>
        <Box paddingLeft={1}>
          <Typography>
            {props.name}
          </Typography>
        </Box>
      </Box>
    </Button>
  );
};

export default User;