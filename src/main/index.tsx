import React, { useCallback, useEffect, useState } from 'react';
import { AppState } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import RNBootSplash from 'react-native-bootsplash';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useAppDispatch } from '../hooks';
import { initAppSuccessful } from '../store/app/appSlice';
import SplashScreen from '../screens/Splash';
import MainStackNavigator, {
  NavigationRef,
  StackNavigationRef,
} from '../router';
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
  }>({ data: null, isRegistered: false, userToken: '' });
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
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
      if (initializing) {
        setInitializing(false);
      }
      if (user) {
        user.getIdTokenResult(true).then(tokenResult => {
          const { claims } = tokenResult;
          setUserAuthenticated({
            data: user,
            isRegistered: !!claims?.isRegistered,
            userToken: tokenResult.token,
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
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const onNavigateTo = (navigation: NavigationRef) => {
    if (nextScreen !== 'Summary') {
      navigation.navigate(nextScreen);
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
      const currentScreen = StackNavigationRef?.getCurrentRoute()?.name;
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

  if (loading || initializing || isAppOpenFirstTime === 'loading') {
    return <SplashScreen />;
  }

  return (
    <RealmAppWrapper fallback={() => <SplashScreen />}>
      <MainAppContext.Provider value={{ registerUser }}>
        <MainStackNavigator
          onReady={navigation => {
            onNavigateTo(navigation);
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
