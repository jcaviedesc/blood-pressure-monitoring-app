import React, { useCallback, useEffect, useState } from 'react';
import { AppState } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import RNBootSplash from 'react-native-bootsplash';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useAppDispatch } from '../hooks';
import { initAppSuccessful } from '../store/app/appSlice';
import SplashScreen from '../screens/Splash';
import MainStackNavigator, { getNavigator } from '../router';
import { useInitialScreenApp } from './hooks';
import { RealmAppWrapper } from '../hooks/realm/provider';
import { useRealmAuth } from '../providers/RealmProvider';
import { MainAppContext } from './context';
import { getUserDetailsThunk } from '../thunks/users-thunk';
import { OPEN_FIRST_TIME_KEY } from '../store/storeKeys';

const Main = () => {
  const dispatch = useAppDispatch();
  const { getItem } = useAsyncStorage(OPEN_FIRST_TIME_KEY);
  const { signIn: signInRealm } = useRealmAuth();
  const { loading, nextScreen } = useInitialScreenApp();
  // TODO change to useReducer
  const [isAppOpenFirstTime, setAppOpenFirstTime] = useState<string | null>(
    'loading',
  );
  const [userAuthenticated, setUserAuthenticated] = useState<{
    data: FirebaseAuthTypes.User | null;
    isRegistered: boolean;
    userToken: string;
    // Set an initializing state whilst Firebase connects
    initializing: boolean;
  }>({ data: null, isRegistered: false, userToken: '', initializing: true });
  console.log({ isAppOpenFirstTime, userToken: userAuthenticated.userToken });
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
      if (user) {
        user.getIdTokenResult(true).then(tokenResult => {
          const { claims } = tokenResult;
          console.log({ claims });
          setUserAuthenticated({
            data: user,
            isRegistered: !!claims?.isRegistered,
            userToken: tokenResult.token,
            initializing: false,
          });
          if (claims?.isRegistered) {
            signInRealm(tokenResult.token);
            // get user info
            dispatch(getUserDetailsThunk());
          }
        });
      } else {
        setUserAuthenticated({
          data: null,
          isRegistered: false,
          userToken: '',
          initializing: false,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const onNavigateTo = () => {
    if (nextScreen !== 'Summary') {
      getNavigator()?.navigate(nextScreen);
    }
    // navigation.navigate('Singup');
  };

  const readAppOpenFirstTimeFromStorage = useCallback(async () => {
    const item = await getItem();
    setAppOpenFirstTime(item);
  }, [getItem]);

  useEffect(() => {
    readAppOpenFirstTimeFromStorage();
    RNBootSplash.hide();
    dispatch(initAppSuccessful());
  }, [dispatch, readAppOpenFirstTimeFromStorage]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  const handleAppStateChange = useCallback(
    (nextAppState: string) => {
      const currentScreen = getNavigator()?.getCurrentRoute()?.name;
      if (
        nextAppState === 'background' &&
        currentScreen !== 'SignUp/ProfilePicture'
      ) {
        if (userAuthenticated?.data && !userAuthenticated.isRegistered) {
          // TODO creo que esto no se muestra si no se lanza un error. Probar
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

  if (
    loading ||
    userAuthenticated.initializing ||
    isAppOpenFirstTime === 'loading'
  ) {
    return <SplashScreen />;
  }

  return (
    <RealmAppWrapper fallback={() => <SplashScreen />}>
      <MainAppContext.Provider value={{ registerUser }}>
        <MainStackNavigator
          onReady={() => {
            onNavigateTo();
          }}
          isUserLogged={userAuthenticated.isRegistered}
          isAuthenticated={userAuthenticated.data !== null}
          showOnboardingScreen={isAppOpenFirstTime !== 'opened'}
        />
      </MainAppContext.Provider>
    </RealmAppWrapper>
  );
};

export default Main;
