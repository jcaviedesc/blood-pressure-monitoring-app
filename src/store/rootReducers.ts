import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './app/appSlice';
import singupReducer from './singup/singupSlice';
import userReducer from './user/userSlice';
import bloodPressure from './blood-pressure';

const rootReducer = combineReducers({
  app: appReducer,
  singup: singupReducer,
  user: userReducer,
  bloodPressure: bloodPressure,
});

export type rootReducerT = typeof rootReducer;

export default rootReducer;
