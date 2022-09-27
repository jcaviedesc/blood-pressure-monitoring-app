import React, { useRef } from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import { Realm, useApp } from '@realm/react';
import RealmContext from './context';
import { useRealmAuth } from '../../providers/RealmProvider';
import { parseError } from '../../services/ErrorUtils';

const openRealmBehaviorConfig = {
  type: 'openImmediately',
  timeOut: 30000,
};

function RealmAppWrapper({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: any;
}) {
  const { RealmProvider } = RealmContext;
  const realmRef = useRef<Realm | null>(null);
  const app = useApp();
  const { realmAuthUser } = useRealmAuth();
  let syncProps = {};

  async function handleSyncError(session, syncError) {
    if (syncError.name === 'ClientReset') {
      try {
        crashlytics().log('error type is ClientReset....');
        let path = realmRef.current?.path; // realm.path will no be accessible after realm.close()
        realmRef.current?.close();
        Realm.App.Sync.initiateClientReset(app, path as string);
        // Download Realm from the server.
        // Ensure that the backend state is fully downloaded before proceeding,
        // which is the default behavior.
        realmRef.current = await Realm.open({});
        realmRef.current.close();
      } catch (err) {
        console.error(err);
      }
    } else {
      crashlytics().log(syncError);
      // ...handle other error types
    }
    crashlytics().recordError(parseError(syncError));
  }

  if (realmAuthUser) {
    syncProps = {
      sync: {
        user: realmAuthUser,
        partitionValue: realmAuthUser.id,
        clientReset: {
          mode: 'discardLocal',
          clientResetBefore: (realm) => {
            // NOT used with destructive schema changes
            console.log('Beginning client reset for ', realm.path);
          },
          clientResetAfter: (beforeRealm, afterRealm) => {
            // NOT used with destructive schema changes
            console.log('Finished client reset for', beforeRealm.path);
            console.log('New realm path', afterRealm.path);
          },
        },
        newRealmFileBehavior: openRealmBehaviorConfig,
        existingRealmFileBehavior: openRealmBehaviorConfig,
        error: handleSyncError,
      },
    };
  }

  console.log({ syncProps });
  return (
    <RealmProvider {...syncProps} fallback={fallback}>
      {children}
    </RealmProvider>
  );
}

export { RealmAppWrapper };
