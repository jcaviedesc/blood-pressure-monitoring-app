import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  MedicineUpState,
  updateUserFieldType,
  HealtInfoAction,
  SexEnum,
} from './types';
import type { RootState } from '../configureStore';
import { signUpUser } from '../../thunks/users-thunk';

/* ------------- Initial State ------------- */
const initialState: MedicineUpState = {
  name: '',
  lastName: '',
  docId: '',
  phone: '',
  address: 'NaN',
  location: [],
  birthdate: '',
  sex: SexEnum.female,
  weight: '',
  height: '',
  userType: '',
  healtQuestions: {
    medicine: '',
    smoke: '',
    heartAttack: '',
    thrombosis: '',
    nephropathy: '',
  },
  picture: { uri: '', type: '' },
};

export const medicineUpSlice = createSlice({
  name: 'signUp',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateUserField: (state, action: PayloadAction<updateUserFieldType>) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    updateHealtQuestions: (state, action: PayloadAction<HealtInfoAction>) => {
      const healtInfoState = state.healtQuestions;
      const { field, value } = action.payload;
      healtInfoState[field] = value;
      state.healtQuestions = healtInfoState;
    },
    clear: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(signUpUser.fulfilled, () => {
      return initialState;
    });
  },
});

export const { updateUserField, updateHealtQuestions, clear } =
medicineUpSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.signup;

export default medicineUpSlice.reducer;
