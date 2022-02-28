import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './app/appSlice';
import singupReducer from './singup/singupSlice';
import userReducer from './user/userSlice';

const rootReducer = combineReducers({
  app: appReducer,
  singup: singupReducer,
  user: userReducer,
});

export type rootReducerT = typeof rootReducer;

export default rootReducer;
