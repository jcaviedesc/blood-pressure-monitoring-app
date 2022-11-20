import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  SignUpState,
  updateUserFieldType,
  HealthInfoAction,
  SexEnum,
} from './types';
import type { RootState } from '../configureStore';
import { signUpUser } from '../../thunks/users-thunk';

/* ------------- Initial State ------------- */
const initialState: SignUpState = {
  name: '',
  lastName: '',
  docId: '',
  phone: '',
  address: 'NaN',
  location: [],
  birthdate: '',
  sex: SexEnum.female,
  weight: '70',
  height: '120',
  userType: '',
  healthQuestions: {
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
    updateHealthQuestions: (state, action: PayloadAction<HealthInfoAction>) => {
      const healthInfoState = state.healthQuestions;
      const { field, value } = action.payload;
      healthInfoState[field] = value;
      state.healthQuestions = healthInfoState;
    },
    clear: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(signUpUser.fulfilled, () => {
      return initialState;
    });
  },
});

export const { updateUserField, updateHealthQuestions, clear } =
  signUpSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.signup;

export default signUpSlice.reducer;
