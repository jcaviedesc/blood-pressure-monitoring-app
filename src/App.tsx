import React from 'react';
import type { Node } from 'react';
import { Provider } from 'react-redux';
import AppScreens from './router/app.router';
import store from './store';

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <AppScreens />
    </Provider>
  );
};

export default App;
