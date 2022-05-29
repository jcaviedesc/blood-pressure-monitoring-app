import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserState, userFromApi, onAuthStateChangedAction } from './types';
import type { RootState } from '../configureStore';

/* ------------- Initial State ------------- */
const initialState: UserState = {
  profile: {
    id: '',
    fullName: '',
    phone: '',
    address: '',
    gender: '',
    weight: {
      val: 0,
      unit: 'Kg',
    },
    height: {
      val: 0,
      unit: 'm',
    },
    birthdate: '',
    userType: '',
    profileUrl: '',
    age: '',
    imc: '',
    isC: false,
  },
  homeStatus: {
    bloodPressure: {
      status: 'no data',
      value: '--',
    },
    nutritional: {
      status: 'no data',
      value: '--',
    },
    heartRate: {
      status: 'no data',
      value: '--',
    },
    bloodGlucose: {
      status: 'no data',
      value: '--',
    },
  },
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateUserProfie: (state, action: PayloadAction<userFromApi>) => {
      state.profile = action.payload;
    },
    updateUserProfileFromSingup: (
      state,
      action: PayloadAction<userFromApi>,
    ) => {
      state.profile = action.payload;
      state.homeStatus.nutritional = {
        status: 'estable',
        value: `${action.payload.weight.val} ${action.payload.weight.unit}`,
      };
    },
    onAuthUserStateChanged: (
      state,
      action: PayloadAction<onAuthStateChangedAction>,
    ) => {
      const { user, token } = action.payload;
      state.profile.isC = token.claims.isC;
      state.profile.fullName = user.displayName ?? '';
      state.profile.profileUrl = user.photoURL ?? '';
    },
    signOut: state => {
      state.profile = initialState.profile;
    },
  },
});

export const {
  updateUserProfie,
  updateUserProfileFromSingup,
  onAuthUserStateChanged,
  signOut,
} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectProfileUser = (state: RootState) => state.user.profile;
export const selectUserData = (state: RootState) => state.user;
export const selectIsUserLogged = (state: RootState) => state.user.profile.isC;

export default userSlice.reducer;
