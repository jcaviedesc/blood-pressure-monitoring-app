import React, { useCallback, useEffect, useState } from 'react';
import { AppState } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import RNBootSplash from 'react-native-bootsplash';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useAppSelector, useAppDispatch } from '../hooks';
import { selectAppUserState, initAppSuccessful } from '../store/app/appSlice';
import SplashScreen from '../screens/Splash';
import OnboardingScreen from '../screens/Onboarding';
import MainStackNavigator, { NavigationRef, StackNavigationRef } from '../router';
import { useInitialScreenApp } from './hooks';
import { RealmAppWrapper } from '../hooks/realm/provider';
import { useRealmAuth } from '../providers/RealmProvider';
import { MainAppContext } from './context';

const Main = () => {
  const { isFirstTime } = useAppSelector(selectAppUserState);
  const { signIn: signInRealm } = useRealmAuth();
  // TODO change to useReducer
  const [userAuthenticated, setUserAuthenticated] = useState<{
    data: FirebaseAuthTypes.User | null;
    isRegistered: boolean;
    userToken: string;
  }>({ data: null, isRegistered: false, userToken: '' });
  const dispatch = useAppDispatch();

  const { loading, nextScreen } = useInitialScreenApp();

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

  const registerUser = useCallback(async () => {
    const authUser = auth().currentUser;
    const token = await authUser?.getIdToken();
    setUserAuthenticated(prevState => ({
      ...prevState,
      isRegistered: true,
      userToken: token as string,
    }));
    signInRealm(token as string);
  }, [signInRealm]);

  // Handle user state changes
  const onAuthStateChanged = useCallback(
    (user: FirebaseAuthTypes.User | null) => {
      if (initializing) {
        setInitializing(false);
      }
      if (user) {
        user.getIdTokenResult(true).then(tokenResult => {
          const { claims } = tokenResult;
          console.log({ claims });
          console.log(tokenResult.token);
          setUserAuthenticated({
            data: user,
            isRegistered: !!claims?.isRegistered,
            userToken: tokenResult.token,
          });
          if (claims?.isRegistered) {
            signInRealm(tokenResult.token);
          }
        });
      } else {
        setUserAuthenticated({
          data: null,
          isRegistered: false,
          userToken: '',
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const onNavigateTo = (navigation: NavigationRef) => {
    if (nextScreen !== 'HomeTabs') {
      navigation.navigate(nextScreen);
    }
    // navigation.navigate('Singup');
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  useEffect(() => {
    RNBootSplash.hide();
    dispatch(initAppSuccessful());
  }, [dispatch]);

  const handleAppStateChange = useCallback(
    (nextAppState: string) => {
      const currentScreen = StackNavigationRef.getCurrentRoute()?.name;
      console.log({ currentScreen });
      if (
        nextAppState === 'background' &&
        currentScreen !== 'Singup/ProfilePicture'
      ) {
        if (userAuthenticated?.data && !userAuthenticated.isRegistered) {
          crashlytics().setAttribute(
            'phone',
            userAuthenticated.data?.phoneNumber as string,
          );
          crashlytics().log(
            `Info: User with phone ${userAuthenticated.data?.phoneNumber} abort the registration`,
          );
        }
      }
    },
    [userAuthenticated],
  );

  useEffect(() => {
    const appStateId = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      appStateId.remove();
    };
  }, [handleAppStateChange]);

  console.log('Main', {
    loading,
    nextScreen,
    userAuthenticated,
  });

  if (loading || initializing) {
    return <SplashScreen />;
  }

  if (isFirstTime) {
    return <OnboardingScreen />;
  }

  return (
    <RealmAppWrapper fallback={() => <SplashScreen />}>
      <MainAppContext.Provider value={{ registerUser }}>
        <MainStackNavigator
          onReady={navigation => {
            onNavigateTo(navigation);
          }}
          isUserLogged={userAuthenticated.isRegistered}
        />
      </MainAppContext.Provider>
    </RealmAppWrapper>
  );
};

export default Main;
