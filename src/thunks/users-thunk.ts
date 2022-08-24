import { createAsyncThunk } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import { userToApi } from '../transformations/user.transform';
import { selectUser } from '../store/signup/signupSlice';
import firebaseStoreService from '../services/FirebaseStore';
import type { RootState, ClientApi } from '../store/configureStore';

export const signUpUser = createAsyncThunk<
  any,
  any,
  {
    extra: ClientApi;
    state: RootState;
  }
>(
  'users/register',
  async function signUpUserThunk(
    _,
    { getState, extra: clientApi, rejectWithValue },
  ) {
    const userData = selectUser(getState());
    const { uid: useruid = 'none' } = auth().currentUser ?? {};
    const { picture } = userData;

    let profile_url = '';
    if (picture.uri !== '') {
      profile_url = await firebaseStoreService(
        `profile-pic.${picture.type?.split('/')[1]}`,
        picture.uri,
        `users/${useruid}/images`,
      );
    }
    console.log({ profile_url });
    const userTransformed = userToApi({
      ...userData,
      profile_url,
    });
    const response = await clientApi.registerUser(userTransformed);
    if (response.status === 201) {
      // TODO add parse response to user state
      return Promise.resolve(response.data);
    } else {
      crashlytics().recordError(
        new Error(`[API/error] ${JSON.stringify(response.data)}`),
      );
      return rejectWithValue(response.data);
    }
  },
);
