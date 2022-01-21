import { configureStore } from '@reduxjs/toolkit';
import singupReducer from './singup/singupSlice';
// ...

const store = configureStore({
  reducer: {
    singup: singupReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
