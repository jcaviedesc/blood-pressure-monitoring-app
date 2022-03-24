import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import rootReducer from './rootReducers';
import { persistedReducer } from './configurePersistStore';
import Api from '../services/api';
import { setScreenLoading } from './app/appSlice';

const clientApi = Api();

const persistedReducerSetup = persistedReducer(rootReducer);

const customMiddleWare = store => next => action => {
  if (action.type.includes('pending')) {
    store.dispatch(setScreenLoading(true));
  } else if (
    action.type.includes('rejected') ||
    action.type.includes('fulfilled')
  ) {
    store.dispatch(setScreenLoading(false));
  }
  next(action);
};

const store = configureStore({
  reducer: persistedReducerSetup,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      thunk: {
        extraArgument: clientApi,
      },
    }).concat(customMiddleWare),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppGetState = typeof store.getState;

export type ClientApi = typeof clientApi;

export default store;
