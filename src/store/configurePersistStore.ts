import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { rootReducerT } from './rootReducers';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: ['app', 'singup'],
};

const persistedReducer = (rootReducer: rootReducerT) =>
  persistReducer(persistConfig, rootReducer);

export { persistedReducer };
