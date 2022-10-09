import { createSlice } from '@reduxjs/toolkit';
import { searchSelfCareTipThunk } from '../../thunks/self-care';
import type { RootState } from '../configureStore';
import { SelfCareState } from './types';

const initialState: SelfCareState = {
  result: [],
  loading: 'idle',
  currentRequestId: undefined,
  error: null,
};

export const selfCareSlice = createSlice({
  name: 'selfCare',
  initialState,
  reducers: {
    clear: state => {
      state.result = [];
    },
    reset: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(searchSelfCareTipThunk.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.result = [];
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(searchSelfCareTipThunk.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          state.result = action.payload;
          state.currentRequestId = undefined;
        }
        state.result = action.payload;
      })
      .addCase(searchSelfCareTipThunk.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          state.error = action.error;
          state.currentRequestId = undefined;
        }
      });
  },
});

export const { clear, reset } = selfCareSlice.actions;

export const selectSearchSelfCare = (state: RootState) => {
  return {
    data: state.selfCare.result,
    loading: state.selfCare.loading,
  };
};

export default selfCareSlice.reducer;
