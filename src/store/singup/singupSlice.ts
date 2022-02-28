import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  SingUpState,
  updateUserFieldType,
  HealtInfoAction,
} from './types';
import type { RootState } from '../configureStore';
import firebaseStoreService from '../../services/FirebaseStore';
import { userToApi } from '../../services/user.transform';
import { AxiosError } from 'axios';

/* ------------- Initial State ------------- */
const initialState: SingUpState = {
  user: {
    fullName: '',
    phone: '',
    address: '',
    location: [],
    gender: '',
    weight: '',
    stature: '',
    birthdate: '',
    userType: '',
    healtInfo: {
      medicine: '',
      smoke: '',
      heartAttack: '',
      thrombosis: '',
      nephropathy: '',
    },
    picture: { uri: '', type: '' },
  },
  loading: false,
};

export const singUpSlice = createSlice({
  name: 'singUp',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateUserField: (state, action: PayloadAction<updateUserFieldType>) => {
      const { field, value } = action.payload;
      state.user[field] = value;
    },
    updateHealtInfo: (state, action: PayloadAction<HealtInfoAction>) => {
      const healtInfoState = state.user.healtInfo;
      const { field, value } = action.payload;
      healtInfoState[field] = value;
      state.user.healtInfo = healtInfoState;
    },
  },
});

export const { updateUserField, updateHealtInfo } = singUpSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.singup.user;

// Thunks
export const saveUser = ({ navigation, fbUserUid }) => {
  return async function saveUserThunk(dispatch, getState, client) {
    dispatch({ type: 'app/state/loading' });
    const user = selectUser(getState());
    const { picture } = user;

    let profile_url = '';
    if (picture.uri !== '') {
      const photoURL = await firebaseStoreService(
        `profile-pic.${picture.type?.split('/')[1]}`,
        picture.uri,
        `users/${fbUserUid}/images`,
      );
      profile_url = photoURL;
    }
    const userTransformed = userToApi({ ...user, profile_url });
    console.log("userTransformed", userTransformed);

    try {
      const response = await client
        .registerUser(userTransformed)
        .catch((error: AxiosError) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
          return { status: error.response?.status };
        });
      if (response.status === 201) {
        navigation.navigate('Home');
      }
      console.log("Error", response);
    } catch (error) {
      console.log(error);
    }
  };
};

export default singUpSlice.reducer;
