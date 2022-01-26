import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './types';
import type { RootState } from '../configureStore';

/* ------------- Initial State ------------- */
const initialState: AppState = {
  appIsLoaded: false,
  isOpenAppFirstTime: true,
  hasUserActiveSession: false,
};

export const appSlice = createSlice({
  name: 'app',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    openAppFirstTime: state => {
      state.isOpenAppFirstTime = false;
    },
    changeUserSessionState: (state, action: PayloadAction<boolean>) => {
      state.hasUserActiveSession = action.payload;
    },
    initAppSuccessful: state => {
      state.appIsLoaded = true;
    },
  },
});

export const { openAppFirstTime, initAppSuccessful, changeUserSessionState } =
  appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAppUserState = (state: RootState) => ({
  isFirstTime: state.app.isOpenAppFirstTime,
  hasUserActiveSession: state.app.hasUserActiveSession,
});

export default appSlice.reducer;
