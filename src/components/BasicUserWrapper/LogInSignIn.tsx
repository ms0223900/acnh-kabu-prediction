import React from 'react';
import { Box, Button } from '@material-ui/core';
import { LogInSignInProps, BasicUserWrapperProps } from './types';
import User from './User';
import { connectCtx } from 'react-function-helpers';
import { MapStateToProps } from 'react-function-helpers/lib/functions/mapContextToProps';
import ContextStore, { UserState } from './context';

const LogInSignIn = (props: LogInSignInProps) => {
  const {
    isLogin,
    loginFn,
    signInFn,
  } = props;

  if(isLogin) {
    return (
      <User {...props} />
    );
  }
  return (
    <Box display={'flex'}>
      <Box paddingLeft={1}>
        <Button onClick={loginFn}>{'Log In'}</Button>
      </Box>
      <Box paddingLeft={1}>
        <Button color={'primary'} onClick={signInFn}>{'Sign In'}</Button>
      </Box>
    </Box>
  );
};

type OwnProps = Omit<BasicUserWrapperProps, 'initUser' | 'children'> 

const mapStateToProps: MapStateToProps<UserState, OwnProps, LogInSignInProps> = (state) => {
  return state.user;
};

export const LogInSignInWithCtx = connectCtx(ContextStore)(mapStateToProps)(LogInSignIn);

export default LogInSignIn;  