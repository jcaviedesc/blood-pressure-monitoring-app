import React, { useCallback, useEffect, useState } from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import RNBootSplash from 'react-native-bootsplash';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useAppSelector, useAppDispatch } from '../hooks';
import { selectAppUserState, initAppSuccessful } from '../store/app/appSlice';
import SplashScreen from '../screens/Splash';
import OnboardingScreen from '../screens/Onboarding';
import MainStackNavigator, { NavigationRef } from '../router';
import { useInitialScreenApp } from './hooks';
import { RealmAppWrapper } from '../hooks/realm/provider';
import { RealmAuthProvider } from '../providers/RealmProvider';

const Main = () => {
  const { isFirstTime } = useAppSelector(selectAppUserState);
  const [userAuthenticated, setUserAuthenticated] = useState<{
    data: FirebaseAuthTypes.User | null;
    isRegistered: boolean;
    userToken: string;
  }>({ data: null, isRegistered: false, userToken: '' });
  const dispatch = useAppDispatch();

  const { loading, nextScreen } = useInitialScreenApp();

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  const onAuthStateChanged = useCallback(
    (user: FirebaseAuthTypes.User | null) => {
      if (initializing) {
        setInitializing(false);
      }
      if (user) {
        user.getIdTokenResult(true).then(tokenResult => {
          const { claims } = tokenResult;
          if (claims?.isRegistered) {
            setUserAuthenticated({
              data: user,
              isRegistered: true,
              userToken: tokenResult.token,
            });
          }
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
    // navigation.navigate('Profile');
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  useEffect(() => {
    RNBootSplash.hide();
    dispatch(initAppSuccessful());
  }, [dispatch]);

  useEffect(() => {
    () => {
      // si el usuario es nuevo y no termina el registo cerramos la session en firebase
      // para borrar los datos de session
      if (userAuthenticated?.data && !userAuthenticated.isRegistered) {
        auth()
          .signOut()
          .then(() => {
            crashlytics().setAttribute(
              'phone',
              userAuthenticated.data?.phoneNumber as string,
            );
            crashlytics().log(
              `Info: User with phone ${userAuthenticated.data?.phoneNumber} did not complete the registration`,
            );
            console.log('register not complete');
          })
          .catch(err => {
            crashlytics().recordError(err);
            //TODO handle clear data and go to login or signup
            console.log(err);
          });
      }
    };
  }, [userAuthenticated]);

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

  // return (
  //   <MainStackNavigator
  //     onReady={navigation => {
  //       onNavigateTo(navigation);
  //     }}
  //     isUserLogged={IsUserFullyRegistered}
  //   />
  // );
  return (
    <RealmAuthProvider authToken={userAuthenticated.userToken}>
      <RealmAppWrapper fallback={() => <SplashScreen />}>
        <MainStackNavigator
          onReady={navigation => {
            onNavigateTo(navigation);
          }}
          isUserLogged={userAuthenticated.isRegistered}
        />
      </RealmAppWrapper>
    </RealmAuthProvider>
  );
};

export default Main;
