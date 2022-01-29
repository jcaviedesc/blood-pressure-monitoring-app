import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from './types';
import type { RootState } from '../configureStore';

/* ------------- Initial State ------------- */
const initialState: AppState = {
  appIsLoaded: false,
  isOpenAppFirstTime: true,
  hasUserActiveSession: false,
  lenguage: '',
  countryCode: '',
};

// persistor config
const appPersistConfig = {
  key: 'app',
  storage: AsyncStorage,
  blacklist: ['appIsLoaded'],
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
    setLenguage: (state, action: PayloadAction<'es' | 'en'>) => {
      state.lenguage = action.payload;
    },
    setCountry: (state, action: PayloadAction<string>) => {
      state.countryCode = action.payload;
    },
  },
});

export const {
  openAppFirstTime,
  initAppSuccessful,
  changeUserSessionState,
  setLenguage,
  setCountry,
} = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAppUserState = (state: RootState) => ({
  isFirstTime: state.app.isOpenAppFirstTime,
  hasUserActiveSession: state.app.hasUserActiveSession,
});

export const selectAppLocale = (state: RootState) => ({
  lenguage: state.app.lenguage,
  countryCode: state.app.countryCode,
});

export default persistReducer(appPersistConfig, appSlice.reducer);
