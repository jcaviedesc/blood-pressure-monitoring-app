import React from 'react';
import RealmContext from './context';
import { useRealmAuth } from '../../providers/RealmProvider';
const { RealmProvider } = RealmContext;

function RealmAppWrapper({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: any;
}) {
  const { realmAuthUser } = useRealmAuth();
  let syncProps = {};

  if (realmAuthUser) {
    syncProps = {
      sync: {
        user: realmAuthUser,
        partitionValue: realmAuthUser.id,
      },
    };
  }
  return (
    <RealmProvider {...syncProps} fallback={fallback}>
      {children}
    </RealmProvider>
  );
}

export { RealmAppWrapper };
