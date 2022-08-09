import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import type { rootReducerT } from './rootReducers';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: ['app', 'singup'],
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = (rootReducer: rootReducerT) =>
  persistReducer(persistConfig, rootReducer);

export { persistedReducer };
