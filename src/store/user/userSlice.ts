import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserState, UpdateUserProfieAction } from './types';
import type { RootState } from '../configureStore';
import { signUpUser } from '../../thunks/users-thunk';

/* ------------- Initial State ------------- */
// TODO deprecar homeStatus
const initialState: UserState = {
  id: '',
  name: '',
  lastName: '',
  phone: '',
  address: '',
  sex: '',
  weight: {
    val: 0,
    unit: 'Kg',
  },
  height: {
    val: 0,
    unit: 'm',
  },
  birthdate: '',
  userType: 2,
  profileUrl: '',
  age: '',
  imc: '',
  avatar: '',
  // homeStatus: {
  //   bloodPressure: {
  //     status: 'no data',
  //     value: '--',
  //   },
  //   nutritional: {
  //     status: 'no data',
  //     value: '--',
  //   },
  //   heartRate: {
  //     status: 'no data',
  //     value: '--',
  //   },
  //   bloodGlucose: {
  //     status: 'no data',
  //     value: '--',
  //   },
  // },
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateUserProfie: (
      state,
      action: PayloadAction<UpdateUserProfieAction>,
    ) => {
      return { ...state, ...action.payload };
    },
    signOut: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      console.log({ userSlice: action.payload });
      return action.payload;
    });
  },
});

export const { updateUserProfie, signOut } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUserData = (state: RootState) => state.user;

export default userSlice.reducer;
