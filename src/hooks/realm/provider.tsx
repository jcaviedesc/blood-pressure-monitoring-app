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

  const syncConfig = {
    user: user || undefined,
    partitionValue: user?.id ?? 'unLogged',
  };

  return (
    <RealmProvider sync={syncConfig} fallback={fallback}>
      {children}
    </RealmProvider>
  );
}

export { RealmAppWrapper };
