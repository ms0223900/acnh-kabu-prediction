import { createContextValueFn, createContextStore } from 'react-function-helpers/lib/functions/contextHelpers';
import ContextWrapperFn from 'react-function-helpers/lib/functions/ContextWrapper';
import { User } from './types';

export interface UserState<CustomUser extends User=User> {
  user: CustomUser
}

const initUserState = {
  user: {
    username: '',
    name: '',
  }
};

enum ACTION_TYPES {
  'SET_USER'
}

export function setUser<CustomUser extends User=User>(payload: CustomUser) {
  return ({
    type: ACTION_TYPES.SET_USER,
    payload,
  });
}

const defaultReducer = (s: UserState, action: any) => {
  console.log(s);
  if(action.type === ACTION_TYPES.SET_USER) {
    return ({
      ...s,
      user: action.payload
    });
  }
  return ({
    user: '' as any
  });
};

export const ContextValue = createContextValueFn(initUserState, defaultReducer);
const ContextStore = createContextStore(initUserState);

export default ContextStore;

export const ContextWrapper = ContextWrapperFn(ContextValue, ContextStore);



