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
  },
});

export const { openAppFirstTime } = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAppUserState = (state: RootState) => ({
  isFirstTime: state.app.isOpenAppFirstTime,
  hasActiveSession: state.app.hasUserActiveSession,
});

export default appSlice.reducer;
