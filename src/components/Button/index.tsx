import React, { Children } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Fonts } from '../../styles';

type props = {
  children?: typeof Children;
  title?: string;
  onPress?: () => void;
  hierarchy?: 'loud' | 'quiet' | 'transparent';
  disabled?: boolean;
  apparence?: object;
  customBackground?: string;
};

const background = {
  loud: Colors.tertiary,
  quiet: Colors.tertiaryTranslucent,
  transparent: Colors.transparent,
};

const Button: React.FC<props> = ({
  children,
  onPress,
  hierarchy = 'loud',
  title,
  disabled,
  apparence,
  customBackground,
}) => {
  const buttonStyles = {
    ...apparence,
    ...styles.container,
    backgroundColor: customBackground ?? background[hierarchy],
  };
  const textStyles = {
    ...styles.title,
    color: hierarchy === 'loud' ? Colors.buttonText : Colors.tertiary,
  };

  if (disabled) {
    buttonStyles.backgroundColor = Colors.buttonDisabled;
    textStyles.color = Colors.textDisabled;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyles}
      disabled={disabled}>
      {children ? children : <Text style={textStyles}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 10,
    height: 52,
    justifyContent: 'center',
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h4,
  },
});

export default Button;
