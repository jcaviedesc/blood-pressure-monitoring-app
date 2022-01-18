import React, { Children } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../styles';

type props = {
  children: typeof Children;
  onPress: Function;
  type: 'fill' | 'outline';
};

const Button: React.FC<props> = ({ children, onPress, type = 'fill' }) => {
  const buttonStyles = {
    ...styles.container,
    backgroundColor:
      type === 'fill' ? Colors.backgroundButton : Colors.transparent,
  };
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.borderColorButton,
    borderWidth: 2,
    height: 52,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Button;
