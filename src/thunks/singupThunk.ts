import { createAsyncThunk } from '@reduxjs/toolkit';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { userToApi } from '../transformations/user.transform';
import { selectUser, clear } from '../store/singup/singupSlice';
import firebaseStoreService from '../services/FirebaseStore';
import { updateUserProfileFromSingup } from '../store/user/userSlice';
import { snakeCaseToCamelCase } from '../services/utils';
import type { RootState, ClientApi } from '../store/configureStore';
import { RegisterCompleteUser } from '../services/api/types';
import { userFromApi } from '../store/user/types';

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
      const confirm = await auth().signInWithPhoneNumber(phone);
      setConfirm({ confirm, phone });
      // dispatch(updateUserField({ field: 'id', value: response.data.id }));
      return Promise.resolve(response.data);
    } else {
      //TODO sentry,
      return rejectWithValue(response.data);
    }
  },
);

export const finishSignUpUser = createAsyncThunk<
  object,
  any,
  {
    extra: ClientApi;
    state: RootState;
  }
>(
  'signup/finishRegistration',
  async function signUpUserFinishThunk(
    navigation,
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
      userFromStore.id,
      userTransformed,
    );
    if (response.status === 201) {
      dispatch(clear());
      dispatch(updateUserProfileFromSingup(response.data));
      navigation.navigate('Home');
      return Promise.resolve();
    } else {
      //TODO sentry
      console.log(response);
      return rejectWithValue(response.data);
    }
  },
);
