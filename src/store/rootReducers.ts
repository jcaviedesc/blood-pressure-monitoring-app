import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './app/appSlice';
import signupReducer from './signup/signupSlice';
import userReducer from './user/userSlice';
import medicineUpReducer from './medicineup/medicineupSlice';
import bloodPressure from './blood-pressure';
import selfcareReducer from './selfcare';

const rootReducer = combineReducers({
  app: appReducer,
  signup: signupReducer,
  user: userReducer,
  bloodPressure: bloodPressure,
  selfcare: selfcareReducer,
  medicineUp: medicineUpReducer,
});

export type RootReducer = typeof rootReducer;

export default rootReducer;
