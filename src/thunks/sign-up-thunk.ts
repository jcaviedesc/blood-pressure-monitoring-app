import { createAsyncThunk } from '@reduxjs/toolkit';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import { userToApi } from '../transformations/user.transform';
import { selectUser, clear } from '../store/signup/signupSlice';
import firebaseStoreService from '../services/FirebaseStore';
import { updateUserProfileFromSingup } from '../store/user/userSlice';
import type { RootState, ClientApi } from '../store/configureStore';
import { RegisterCompleteUser } from '../services/api/types';

export const signUpUser = createAsyncThunk<
  object | FirebaseAuthTypes.ConfirmationResult,
  any,
  {
    extra: ClientApi;
    state: RootState;
  }
>(
  'signup/register',
  async function signUpUserThunk(
    setConfirm,
    { getState, extra: clientApi, rejectWithValue },
  ) {
    const { fullName, docId, phone } = selectUser(getState());
    const response = await clientApi.registerUser({ fullName, docId, phone });
    if (response.status === 201) {
      try {
        const confirm = await auth().signInWithPhoneNumber(phone);
        setConfirm(confirm);
      } catch (error) {
        console.log(error);
        crashlytics().recordError(new Error(error));
        return rejectWithValue(error);
      }
      // dispatch(updateUserField({ field: 'id', value: response.data.id }));
      return Promise.resolve(response.data);
    } else {
      crashlytics().recordError(
        new Error(`[API/error] ${JSON.stringify(response.data)}`),
      );
      return rejectWithValue(response.data);
    }
  },
);

export const finishSignUpUser = createAsyncThunk<
  any,
  any,
  {
    extra: ClientApi;
    state: RootState;
  }
>(
  'signup/finishRegistration',
  async function signUpUserFinishThunk(
    _,
    { getState, extra: clientApi, rejectWithValue, dispatch },
  ) {
    const userFromStore = selectUser(getState());
    const { uid: useruid = 'none' } = auth().currentUser ?? {};
    const { picture } = userFromStore;

    let profile_url = '';
    if (picture.uri !== '') {
      const photoURL = await firebaseStoreService(
        `profile-pic.${picture.type?.split('/')[1]}`,
        picture.uri,
        `users/${useruid}/images`,
      );
      profile_url = photoURL;
    }
    const userTransformed = userToApi({
      ...userFromStore,
      profile_url,
    }) as RegisterCompleteUser;

    const response = await clientApi.finishRegistration(
      `${userFromStore.id}`,
      userTransformed,
    );
    if (response.status === 201) {
      dispatch(clear());
      dispatch(updateUserProfileFromSingup(response.data));
      return Promise.resolve();
    } else {
      // TODO create customError
      const error = new Error(
        response.data?.message ?? '[API error] post /user failed',
      );
      crashlytics().recordError(error);
      return rejectWithValue(response.data);
    }
  },
);
