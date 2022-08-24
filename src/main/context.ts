import React from 'react';

type MainAppContextType = {
  registerUser: () => void;
};
export const MainAppContext = React.createContext<MainAppContextType>({
  registerUser: () => {
    // noop
  },
});
