import { createAsyncThunk } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import { userToApi } from '../transformations/user.transform';
import { selectUser } from '../store/signup/signupSlice';
import {
  selectUserDeviceToken,
  selectUserMeasurements,
  updateMeasurements,
} from '../store/user/userSlice';
import firebaseStoreService from '../services/FirebaseStore';
import type { RootState, ClientApi } from '../store/configureStore';
import { Measurement } from '../store/user/types';

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
    const userTransformed = userToApi({
      ...userData,
      profile_url,
    });

    try {
      // TODO revisar los types
      const response = await clientApi.registerUser(userTransformed);
      return Promise.resolve(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// este thunk se ejecuta cada vez que se abre el app carga (onAppBootstrap) y el usuario esta autenticado
export const startUserSessionThunk = createAsyncThunk<
  any,
  string,
  {
    extra: ClientApi;
    state: RootState;
  }
>(
  'user/session/start',
  async function startSession(
    userId,
    { extra: clientApi, rejectWithValue, getState },
  ) {
    const previusDeviceTokenSaved = selectUserDeviceToken(getState());
    // get messaging token
    const messagingToken = await messaging().getToken();
    if (previusDeviceTokenSaved !== messagingToken) {
      return Promise.resolve();
    }
    // TODO get device info
    try {
      await clientApi.registerUserDeviceToken(userId, messagingToken);
      return Promise.resolve();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getUserDetailsThunk = createAsyncThunk<
  any,
  undefined,
  {
    extra: ClientApi;
    state: RootState;
  }
>(
  'user/getUserDetails',
  async function getUserDetails(
    _,
    { extra: clientApi, rejectWithValue, getState, requestId },
  ) {
    const { currentRequestId, loading } = getState().user;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return Promise.resolve();
    }
    let response = { data: undefined };
    try {
      response = await clientApi.getUserDetails();
      // TODO validar error
      // TODO agregar ultima vez de sincronizacion.
      return Promise.resolve(response.data);
    } catch (error) {
      rejectWithValue(error);
      return Promise.reject(error?.message);
    }
  },
);

export const setLastMeasurement = createAsyncThunk<
  any,
  Measurement,
  { state: RootState }
>(
  'user/measurements/update',
  function updateUserMeasurements(measurement, { getState, dispatch }) {
    const userMeasurements = selectUserMeasurements(getState());
    const updatedMeasurements = userMeasurements.map(storeMeasurement => {
      if (storeMeasurement.name === measurement.name) {
        return measurement;
      }
      return storeMeasurement;
    });

    dispatch(updateMeasurements(updatedMeasurements));
  },
);
