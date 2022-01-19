import React, { Children } from 'react';
import { TouchableHighlight, StyleSheet, Text } from 'react-native';
import { Colors, Fonts } from '../../styles';
import colors from '../../styles/Colors';

type props = {
  children?: typeof Children;
  title?: string;
  onPress: Function;
  type?: 'fill' | 'outline';
  disabled?: boolean;
};

const Button: React.FC<props> = ({
  children,
  onPress,
  type = 'fill',
  title,
  disabled,
}) => {
  let buttonStyles = {
    ...styles.container,
    backgroundColor:
      type === 'fill' ? Colors.backgroundButton : Colors.transparent,
  };
  if (disabled) {
    buttonStyles.backgroundColor = Colors.gray;
  }

  return (
    <TouchableHighlight
      onPress={onPress}
      style={buttonStyles}
      disabled={disabled}>
      {children ? children : <Text style={styles.title}>{title}</Text>}
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.borderColorButton,
    borderWidth: 0.5,
    height: 52,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontFamily: Fonts.type.bold,
    lineHeight: 43,
    fontSize: 40,
    height: 30,
  },
});

export default Button;
