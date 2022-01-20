import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SingUpState, Gender } from './types';
import type { RootState } from '../../store';

/* ------------- Initial State ------------- */
const initialState: SingUpState = {
  user: {
    fullName: '',
    phone: '',
    address: '',
    location: [],
    gender: Gender.male,
    weight: 0,
    birtdate: new Date().toUTCString(),
  },
};

export const singUpSlice = createSlice({
  name: 'singUp',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateUserField: (state, action: PayloadAction<object>) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { updateUserField } = singUpSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.singup.user;

export default singUpSlice.reducer;
