import React, { useContext, useState, useEffect, useCallback } from 'react';
import Realm from 'realm';
import { useApp } from '@realm/react';

// Create a new Context object that will be provided to descendants of
// the RealmAuthProvider.
type RealmAuthContextType = {
  signIn: (token: string) => void;
  signOutRealm: () => void;
  realmAuthUser: null | Realm.User;
};

export const RealmAuthContext = React.createContext<RealmAuthContextType>({
  signIn: () => {
    // noop
  },
  signOutRealm: () => {
    // noop
  },
  realmAuthUser: null,
});

// The RealmAuthProvider is responsible for user management and provides the
// RealmAuthContext value to its descendants. Components under an RealmAuthProvider can
// use the useRealmAuth() hook to access the auth value.
const RealmAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const app = useApp();
  const [realmAuthUser, setRealmAuthUser] = useState(app?.currentUser);

  const signIn = useCallback(
    async token => {
      if (realmAuthUser !== null || token === '') {
        return;
      }
      const jwt = token;
      try {
        const credentials = Realm.Credentials.jwt(jwt);
        const userLogged = await app.logIn(credentials);
        console.log('Successfully logged in!', userLogged.id);
        setRealmAuthUser(userLogged);
      } catch (err) {
        // TODO add crashreport
        console.error('Failed to log in', err?.message);
      }
    },
    [app, realmAuthUser],
  );

  // The signOut function calls the logOut function on the currently
  // logged in realmAuthUser
  const signOutRealm = () => {
    if (realmAuthUser === null) {
      console.warn("Not logged in, can't log out!");
      return;
    }
    realmAuthUser.logOut();
    setRealmAuthUser(null);
  };

  return (
    <RealmAuthContext.Provider
      value={{
        signIn,
        signOutRealm,
        realmAuthUser,
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
