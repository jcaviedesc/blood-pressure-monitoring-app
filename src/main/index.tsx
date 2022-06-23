import React, { useCallback, useEffect, useRef, useState } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useAppSelector, useAppDispatch } from '../hooks';
import { selectAppUserState, initAppSuccessful } from '../store/app/appSlice';
import {
  selectUserIsFullyRegistered,
  onAuthUserStateChanged,
} from '../store/user/userSlice';
import SplashScreen from '../screens/Splash';
import OnboardingScreen from '../screens/Onboarding';
import MainStackNavigator, {
  NavigationRef,
  StackNavigationRef,
} from '../router';
import { useInitialScreenApp } from './hooks';

const Main = () => {
  const { isFirstTime } = useAppSelector(selectAppUserState);
  const IsUserFullyRegistered = useAppSelector(selectUserIsFullyRegistered);
  const [userAuthenticated, setUserAuthenticated] =
    useState<FirebaseAuthTypes.User | null>(null);
  const dispatch = useAppDispatch();

  const { loading, nextScreen } = useInitialScreenApp();

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  const onAuthStateChanged = useCallback(
    (fbUser: FirebaseAuthTypes.User | null) => {
      console.log({ onAuthStateChanged: '', fbUser });
      if (initializing) {
        setInitializing(false);
      }
      if (!userAuthenticated && fbUser && !IsUserFullyRegistered) {
        fbUser.getIdTokenResult(true).then(tokenResult => {
          const { claims } = tokenResult;
          dispatch(
            onAuthUserStateChanged({
              token: tokenResult,
              user: fbUser.toJSON() as FirebaseAuthTypes.UserInfo,
            }),
          );
          console.log({ fbUser, tokenResult });
          if (!claims.isC) {
            console.log(StackNavigationRef);
            StackNavigationRef.navigate('Singup/Birthdate');
          }
        });
      }
      if (fbUser !== userAuthenticated) {
        setUserAuthenticated(fbUser);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const onNavigateTo = (navigation: NavigationRef) => {
    if (nextScreen !== 'Home') {
      navigation.navigate(nextScreen);
    }
    // navigation.navigate('BloodPressure/Meassuring');
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  useEffect(() => {
    RNBootSplash.hide();
    dispatch(initAppSuccessful());
  }, [dispatch]);

  console.log('Main', {
    loading,
    nextScreen,
    IsUserFullyRegistered,
    userAuthenticated,
  });

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
      isUserLogged={IsUserFullyRegistered}
    />
  );
};

export default Main;
