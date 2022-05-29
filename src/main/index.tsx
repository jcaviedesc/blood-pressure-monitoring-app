import React, { useCallback, useEffect, useState } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useAppSelector, useAppDispatch } from '../hooks';
import { selectAppUserState, initAppSuccessful } from '../store/app/appSlice';
import {
  selectIsUserLogged,
  onAuthUserStateChanged,
} from '../store/user/userSlice';
import SplashScreen from '../screens/Splash';
import OnboardingScreen from '../screens/Onboarding';
import MainStackNavigator, { NavigationRef } from '../router';
import { useInitialScreenApp } from './hooks';

const Main = () => {
  const { isFirstTime } = useAppSelector(selectAppUserState);
  const isUserLogged = useAppSelector(selectIsUserLogged);
  const dispatch = useAppDispatch();

  const { loading, nextScreen } = useInitialScreenApp();

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  const onAuthStateChanged = useCallback(
    (fbUser: FirebaseAuthTypes.User | null) => {
      if (initializing) {
        setInitializing(false);
      }
      if (fbUser && !isUserLogged) {
        fbUser.getIdTokenResult(true).then(jwt => {
          dispatch(
            onAuthUserStateChanged({
              token: jwt,
              user: fbUser.toJSON() as FirebaseAuthTypes.UserInfo,
            }),
          );
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const onNavigateTo = (navigation: NavigationRef) => {
    if (nextScreen !== 'Home') {
      navigation.navigate(nextScreen);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  useEffect(() => {
    RNBootSplash.hide();
    dispatch(initAppSuccessful());
  }, [dispatch]);

  console.log('Main', { loading, nextScreen, isUserLogged });

  if (loading || initializing) {
    return <SplashScreen />;
  }

  if (isFirstTime) {
    return <OnboardingScreen />;
  }

  return (
    <MainStackNavigator
      onReady={navigation => {
        onNavigateTo(navigation);
      }}
      isUserLogged={isUserLogged}
    />
  );
};

export default Main;
