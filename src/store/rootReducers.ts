import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './app/appSlice';
import signupReducer from './signup/signupSlice';
import userReducer from './user/userSlice';
import bloodPressure from './blood-pressure';

const rootReducer = combineReducers({
  app: appReducer,
  signup: signupReducer,
  user: userReducer,
  bloodPressure: bloodPressure,
});

export type rootReducerT = typeof rootReducer;

export default rootReducer;
