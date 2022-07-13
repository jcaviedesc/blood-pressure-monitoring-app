import React, { useContext, useState, useEffect, useCallback } from 'react';
import Realm from 'realm';
import auth from '@react-native-firebase/auth';
import RealmApp from '../services/RealmApp';

// Create a new Context object that will be provided to descendants of
// the RealmAuthProvider.
type RealmAuthContextType = {
  signIn: () => void;
  signOut: () => void;
  user: null | Realm.User;
};

export const RealmAuthContext = React.createContext<RealmAuthContextType>({
  signIn: () => {
    // noop
  },
  signOut: () => {
    // noop
  },
  user: null,
});

// The RealmAuthProvider is responsible for user management and provides the
// RealmAuthContext value to its descendants. Components under an RealmAuthProvider can
// use the useRealmAuth() hook to access the auth value.
const RealmAuthProvider = ({ children }) => {
  const [user, setUser] = useState(RealmApp.currentUser);

  const signIn = useCallback(async () => {
    const fbUser = auth().currentUser;
    if (user !== null || fbUser === null) {
      return;
    }
    const jwt = await fbUser?.getIdToken();
    try {
      const credentials = Realm.Credentials.jwt(jwt);
      const userLogged = await RealmApp.logIn(credentials);
      console.log('Successfully logged in!', userLogged.id);
      setUser(userLogged);
    } catch (err) {
      console.error('Failed to log in', err.message);
    }
  }, [user]);

  useEffect(() => {
    signIn();
  }, [signIn]);

  // The signOut function calls the logOut function on the currently
  // logged in user
  const signOut = () => {
    if (user == null) {
      console.warn("Not logged in, can't log out!");
      return;
    }
    user.logOut();
    setUser(null);
  };

  return (
    <RealmAuthContext.Provider
      value={{
        signIn,
        signOut,
        user,
      }}>
      {children}
    </RealmAuthContext.Provider>
  );
};

// The useRealmAuth hook can be used by components under an RealmAuthProvider to
// access the auth context value.
const useRealmAuth = (): RealmAuthContextType => {
  const authContext = useContext(RealmAuthContext);
  if (authContext == null) {
    throw new Error('useRealmAuth() called outside of a RealmAuthProvider?');
  }
  return authContext;
};

export { RealmAuthProvider, useRealmAuth };
