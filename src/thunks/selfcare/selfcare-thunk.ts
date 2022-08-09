import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ClientApi, RootState } from '../../store/configureStore';
import { buildSelfcareRequest } from '../../transformations/selfcare.transform';

export const createSelfcareTipThunk = createAsyncThunk<
  object,
  object,
  {
    extra: ClientApi;
    state: RootState;
  }
>(
  'selfcare/create',
  async (selfcareTip, { extra: clientApi, rejectWithValue }) => {
    // TODO select language
    const buildRequestData = buildSelfcareRequest(selfcareTip);
    const response = await clientApi.createSelfcareTip(buildRequestData);

    if (response.status >= 300) {
      return rejectWithValue(response.data);
      // TODO handle error message
    }

    return Promise.resolve(response.data);
  },
);

export const searchSelfcareTipThunk = createAsyncThunk<
  string,
  string,
  {
    extra: ClientApi;
    state: RootState;
  }
>(
  'selfcare/search',
  async (
    searchWords,
    { getState, requestId, extra: clientApi, rejectWithValue },
  ) => {
    const { currentRequestId, loading } = getState().selfcare;
    console.log({ currentRequestId, requestId });
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }
    const response = await clientApi.searchSelfcareTip('patient', {
      q: searchWords,
      limit: 9,
      page: 1,
    });

    if (response.status >= 300) {
      return rejectWithValue(response.data);
      // TODO handle error message
    }

    return Promise.resolve(response.data);
  },
);
