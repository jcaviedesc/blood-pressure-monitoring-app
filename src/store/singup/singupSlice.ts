import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  SingUpState,
  updateUserFieldType,
  HealtInfoAction,
} from './types';
import type { RootState } from '../configureStore';

/* ------------- Initial State ------------- */
const initialState: SingUpState = {
  fullName: '',
  docId: '',
  phone: '',
  address: '',
  location: [],
  birthdate: '',
  gender: '',
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

export const singUpSlice = createSlice({
  name: 'singUp',
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
});

export const { updateUserField, updateHealtInfo, clear } = singUpSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.singup;

export default singUpSlice.reducer;
