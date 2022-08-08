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
  'selfcarte/create',
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
