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
  const { user } = useRealmAuth();

  const syncProps =
    user !== null
      ? {
        sync: { user: user, partitionValue: user.id },
      }
      : {};

  console.log({ syncProps });
  return (
    <RealmProvider {...syncProps} fallback={fallback}>
      {children}
    </RealmProvider>
  );
}

export { RealmAppWrapper };
