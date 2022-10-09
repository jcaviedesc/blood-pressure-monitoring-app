import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  UserState,
  UpdateUserProfieAction,
  IUserDetail,
  Measurement,
} from './types';
import type { RootState } from '../configureStore';
import { signUpUser, getUserDetailsThunk } from '../../thunks/users-thunk';

/* ------------- Initial State ------------- */
// TODO deprecar homeStatus
const initialState: UserState = {
  detail: {
    id: '',
    name: '',
    docId: '',
    lastName: '',
    phone: '',
    address: '',
    sex: '',
    birthdate: '',
    role: 2,
    avatar: '',
    age: '',
    bmi: '',
    measurements: [],
    createdAt: '',
    updatedAt: '',
  },
  lastSyncDatetime: '',
  deviceToken: undefined,
  loading: 'idle',
  currentRequestId: undefined,
  error: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateUserDetail: (
      state,
      action: PayloadAction<UpdateUserProfieAction>,
    ) => {
      state.detail = { ...state.detail, ...action.payload };
    },
    updateMeasurements: (state, action: PayloadAction<Measurement[]>) => {
      state.detail.measurements = action.payload;
    },
    signOut: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.detail = action.payload;
      })
      .addCase(getUserDetailsThunk.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(getUserDetailsThunk.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          state.detail = action.payload;
          state.error = undefined;
          state.currentRequestId = undefined;
        }
      })
      .addCase(getUserDetailsThunk.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          state.error = action.error.message;
          state.currentRequestId = undefined;
        }
      });
  },
});

export const { updateUserDetail, signOut, updateMeasurements } =
  userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUserData = (state: RootState): IUserDetail => {
  return Object.assign({}, initialState.detail, state.user.detail);
};

export const selectUserDeviceToken = (state: RootState) =>
  state.user.deviceToken;

export const selectUserMeasurements = (state: RootState): Measurement[] => {
  return state.user.detail.measurements;
};

export default userSlice.reducer;
