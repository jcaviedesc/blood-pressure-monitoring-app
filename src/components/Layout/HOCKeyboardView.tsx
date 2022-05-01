import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native'

const styles = {
  container: {
    flex: 1,
  },
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

const HOCKeyboardView: React.FC<Props> = ({ children }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default HOCKeyboardView;
