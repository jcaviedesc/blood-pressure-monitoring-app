import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from './types';
import type { RootState } from '../configureStore';

/* ------------- Initial State ------------- */
const initialState: AppState = {
  appIsLoaded: false,
  isOpenAppFirstTime: true,
  lenguage: '',
  countryCode: '',
  screenLoading: false,
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
    initAppSuccessful: state => {
      state.appIsLoaded = true;
      state.screenLoading = false;
    },
    setLenguage: (state, action: PayloadAction<'es' | 'en'>) => {
      state.lenguage = action.payload;
    },
    setCountry: (state, action: PayloadAction<string>) => {
      state.countryCode = action.payload;
    },
    setScreenLoading: (state, action: PayloadAction<boolean>) => {
      state.screenLoading = action.payload;
    },
  },
});

export const {
  openAppFirstTime,
  initAppSuccessful,
  setLenguage,
  setCountry,
  setScreenLoading,
} = appSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAppUserState = (state: RootState) => ({
  isFirstTime: state.app.isOpenAppFirstTime,
});

export const selectAppLocale = (state: RootState) => ({
  lenguage: state.app.lenguage,
  countryCode: state.app.countryCode,
});

export const selectAppScreenLoading = (state: RootState) => {
  return state.app.screenLoading;
};

export default persistReducer(appPersistConfig, appSlice.reducer);
