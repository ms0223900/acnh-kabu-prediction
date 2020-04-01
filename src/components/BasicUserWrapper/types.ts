import { ReactNode } from "react";
import { Callback } from "common-types";

export interface User {
  username: string
  name: string
  isLogin?: boolean
  userImageUrl?: string
  jwt?: string
}

export interface NavBarProps {
  children: ReactNode
}

export interface UserProps extends User {

}

export interface LogInSignInProps extends User {
  loginFn?: Callback
  signInFn?: Callback
}

export interface BasicUserWrapperProps<CustomUser extends User=User> {
  initUser: CustomUser
  children: ReactNode
  loginFn?: (setToCtxCb?: Callback) => any
  signFn?: (etToCtxCb?: Callback) => any
}