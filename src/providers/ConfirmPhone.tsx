import React, { useState } from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface IConfirmPhoneContenxt {
  values: {
    phone: string;
    confirm: null | FirebaseAuthTypes.ConfirmationResult;
  };
  setConfirm:
    | Function
    | React.Dispatch<
        React.SetStateAction<FirebaseAuthTypes.ConfirmationResult>
      >;
}
const ConfirmPhoneContext = React.createContext({
  values: { confirm: null, phone: '' },
  setConfirm: () => {},
} as IConfirmPhoneContenxt);

interface IConfirmPhoneProvider {
  children: Element[] | Element;
}

const ConfirmPhoneProvider = ({ children }: IConfirmPhoneProvider) => {
  const [values, setConfirm] = useState({ confirm: null, phone: '' });
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { values, setConfirm };
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
