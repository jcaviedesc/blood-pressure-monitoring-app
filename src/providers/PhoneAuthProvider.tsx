import React, { useMemo, useState } from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface IConfirmPhoneContenxt {
  confirm: null | FirebaseAuthTypes.ConfirmationResult;
  setConfirm: Function | React.Dispatch<FirebaseAuthTypes.ConfirmationResult>;
}
const ConfirmPhoneContext = React.createContext({
  confirm: null,
  setConfirm: () => {
    // noop
  },
} as IConfirmPhoneContenxt);

interface IConfirmPhoneProvider {
  children: React.ReactNode;
}

const ConfirmPhoneProvider = ({ children }: IConfirmPhoneProvider) => {
  const [confirm, setConfirm] = useState(null);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = useMemo(() => ({ setConfirm, confirm }), [confirm]);
  return (
    <ConfirmPhoneContext.Provider value={value}>
      {children}
    </ConfirmPhoneContext.Provider>
  );
};

function useConfirmPhone() {
  const context = React.useContext(ConfirmPhoneContext);
  if (context === undefined) {
    throw new Error(
      'useConfirmPhone must be used within a ConfirmPhoneProvider',
    );
  }
  return context;
}

export { ConfirmPhoneProvider, useConfirmPhone };
