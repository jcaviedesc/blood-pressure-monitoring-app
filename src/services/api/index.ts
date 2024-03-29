import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { API_URL } from 'react-native-dotenv';
import auth from '@react-native-firebase/auth';
import type { RegisterUser } from './types';
// our "constructor"
const create = (baseURL = API_URL) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an axios-based api object.
  //
  const api = axios.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    // 15 second timeout...
    timeout: 15000,
  });

  api.interceptors.request.use(async function (config: AxiosRequestConfig) {
    const user = auth().currentUser;
    const token = await user?.getIdToken();
    if (config?.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const registerUser = (data: RegisterUser): AxiosPromise =>
    api.post('/users', data);

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    registerUser,
  };
};

// let's return back our create method as the default.
export default create;
