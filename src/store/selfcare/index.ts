import { createSlice } from '@reduxjs/toolkit';
import { searchSelfcareTipThunk } from '../../thunks/selfcare/selfcare-thunk';
import type { RootState } from '../configureStore';

const initialState = {
  searchResult: [],
  loading: 'idle',
  currentRequestId: undefined,
  error: null,
};

export const selfcareSlice = createSlice({
  name: 'selfcare',
  initialState,
  reducers: {
    clear: state => {
      state.searchResult = [];
    },
    set: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(searchSelfcareTipThunk.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(searchSelfcareTipThunk.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          state.searchResult = action.payload;
          state.currentRequestId = undefined;
        }
        state.searchResult = action.payload;
      })
      .addCase(searchSelfcareTipThunk.rejected, (state, action) => {
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

export const { clear } = selfcareSlice.actions;

export const selectSearchSelfcare = (state: RootState) => {
  return {
    data: state.selfcare.searchResult,
    loading: state.selfcare.loading,
  };
};

export default selfcareSlice.reducer;
