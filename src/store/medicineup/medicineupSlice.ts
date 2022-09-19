import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../configureStore';
import { MedicineUp, MedicineUpState } from './types';
import { fetchListMedicine } from '../../thunks/medicine/medicine-thunks';
import { medicineFieldType } from "./types"
/* ------------- Initial State ------------- */
const initialState: MedicineUpState = {
  medicineQuestion: {
    name: '',
    apparience: '',
    dose: {
      unit: '',
      value: 0,
    },
    via: '',
    frecuency: '',
    days: [],
    times_per_day: 0,
    times: [],
  },
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
    updateMedicine: (state, action: PayloadAction<medicineFieldType>) => {
      const medicineInfoState = state.medicineQuestion;
      const { field, value } = action.payload;
      medicineInfoState[field] = value;
      state.medicineQuestion = medicineInfoState;
    },
    clear: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(fetchListMedicine.fulfilled, (state, action: any) => ({
      ...state,
      medicineUpSlice: action.payload,
    }));
  },
});

export const {updateMedicine, clear } = medicineUpSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMedicineUp = (state: RootState) => state.medicineUp;

export default medicineUpSlice.reducer;
