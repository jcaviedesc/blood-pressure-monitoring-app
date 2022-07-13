import type { AppDispatch, AppGetState } from '../store/configureStore';

export const AuthValidationThunk = (flowScreen: string, navigation: any) => {
  return async (dispatch: AppDispatch, getState: AppGetState) => {
    const user = getState().user;
    console.log('AuthenticationFlow', user, flowScreen);
    if (flowScreen === 'SingUp') {
      navigation.navigate('Singup/Birthdate');
      return Promise.resolve();
      // navigate to 'Singup/Birthdate' screen
    } else {
      // request user data
      return Promise.resolve();
    }
  };
};
