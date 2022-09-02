import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../configureStore';
import { MedicineUp, MedicineUpState } from './types';
import { fetchListMedicine } from '../../thunks/medicine/medicine-thunks';

/* ------------- Initial State ------------- */
const initialState: MedicineUpState = {
  listMedicine: [],
  /* name: '',
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
  picture: { uri: '', type: '' }, */
};

export const medicineUpSlice = createSlice({
  name: 'medicineUp',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    /* updateUserField: (state, action: PayloadAction<updateUserFieldType>) => {
      const { field, value } = action.payload;
      state[field] = value;
    },*/
    updateMedicine: (state, action: PayloadAction<MedicineUp>) => {
      const healtInfoState = state.healtQuestions;
      const { field, value } = action.payload;
      healtInfoState[field] = value;
      state.healtQuestions = healtInfoState;
    },
    clear: () => initialState, 
  },
  extraReducers: builder => {
    builder.addCase(fetchListMedicine.fulfilled, (state, action: any) => {
      state.listMedicine = action;
    });
  },
});

export const { clear } = medicineUpSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMedicineUp = (state: RootState) => state.medicineUp;

export default medicineUpSlice.reducer;
