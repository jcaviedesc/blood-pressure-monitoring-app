import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ClientApi, RootState } from '../../store/configureStore';
import { buildSelfCareRequest } from '../../transformations/selfCare.transform';

export const createSelfCareTipThunk = createAsyncThunk<
  object,
  object,
  {
    extra: ClientApi;
    state: RootState;
  }
>(
  'selfCare/create',
  async (selfCareTip, { extra: clientApi, rejectWithValue }) => {
    // TODO select language
    const buildRequestData = buildSelfCareRequest(selfCareTip);
    try {
      const response = await clientApi.createSelfCareTip(buildRequestData);
      return Promise.resolve(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const searchSelfCareTipThunk = createAsyncThunk<
  string,
  string,
  {
    extra: ClientApi;
    state: RootState;
  }
>(
  'selfCare/search',
  async (
    searchWords,
    { getState, requestId, extra: clientApi, rejectWithValue },
  ) => {
    const { currentRequestId, loading } = getState().selfCare;
    console.log({ currentRequestId, requestId });
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }

    try {
      const response = await clientApi.searchSelfCareTip('patient', {
        q: searchWords,
        limit: 9,
        page: 1,
      });
      return Promise.resolve(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
