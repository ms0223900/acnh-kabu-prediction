import React, { useContext } from 'react';
import { Box } from '@material-ui/core';
import ContextStore, { ContextWrapper, setUser } from './context';
import { BasicUserWrapperProps } from './types';
import NavBar from './NavBar';
import LogInSignIn, { LogInSignInWithCtx } from './LogInSignIn';

const BasicUserWrapper = (props: BasicUserWrapperProps) => {
  const {
    loginFn,
  } = props;
  const { state, dispatch } = useContext(ContextStore);
  const {
    user
  } = state;

  const setToCtx = (payload: BasicUserWrapperProps['initUser']) => {
    dispatch(setUser(payload));
  };

  const handleLogin = () => {
    loginFn && loginFn(setToCtx);
  };

  return (
    <>
      <NavBar>
        <LogInSignInWithCtx
          loginFn={handleLogin} />
      </NavBar>
      {props.children}
    </>
  );
};

const BasicUserWrapperWithCtx = (props: BasicUserWrapperProps) => (
  <ContextWrapper customInitState={{
    user: props.initUser,
  }}>
    <BasicUserWrapper {...props}/>
  </ContextWrapper>
);

export default BasicUserWrapperWithCtx;