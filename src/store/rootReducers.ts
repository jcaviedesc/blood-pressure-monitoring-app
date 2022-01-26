import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './app/appSlice';
import singupReducer from './singup/singupSlice';

const rootReducer = combineReducers({
  app: appReducer,
  singup: singupReducer,
});

export type rootReducerT = typeof rootReducer;

export default rootReducer;
