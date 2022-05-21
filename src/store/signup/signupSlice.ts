import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  SignUpState,
  updateUserFieldType,
  HealtInfoAction,
  Gender,
} from './types';
import type { RootState } from '../configureStore';
import { signUpUser } from '../../thunks/sign-up-thunk';

/* ------------- Initial State ------------- */
const initialState: SignUpState = {
  fullName: '',
  docId: '',
  phone: '',
  address: 'NaN',
  location: [],
  birthdate: '',
  gender: Gender.female,
  weight: '',
  height: '',
  userType: '',
  healtInfo: {
    medicine: '',
    smoke: '',
    heartAttack: '',
    thrombosis: '',
    nephropathy: '',
  },
  picture: { uri: '', type: '' },
};

export const signUpSlice = createSlice({
  name: 'signUp',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateUserField: (state, action: PayloadAction<updateUserFieldType>) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    updateHealtInfo: (state, action: PayloadAction<HealtInfoAction>) => {
      const healtInfoState = state.healtInfo;
      const { field, value } = action.payload;
      healtInfoState[field] = value;
      state.healtInfo = healtInfoState;
    },
    clear: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      // TODO ver como tipar action.payload
      const { id } = action.payload;
      state.id = id;
    });
  },
});

export const { updateUserField, updateHealtInfo, clear } = signUpSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.signup;

export default signUpSlice.reducer;
