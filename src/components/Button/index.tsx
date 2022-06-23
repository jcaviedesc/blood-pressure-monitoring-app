import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts } from '../../styles';

type props = {
  children?: React.ReactNode;
  title?: string;
  onPress?: () => void;
  hierarchy?: 'loud' | 'quiet' | 'transparent';
  disabled?: boolean;
  apparence?: object;
  customBackground?: string;
  size?: 'large' | 'normal' | 'small';
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
  size = 'normal',
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

  if (size === 'small') {
    buttonStyles.height = 32;
    buttonStyles.paddingHorizontal = 9;
    textStyles.fontSize = Fonts.size.h5;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyles}
      disabled={disabled}>
      {children ? (
        children
      ) : (
        <View style={styles.content}>
          <Text style={textStyles}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    height: 52,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h4,
  },
});

export default Button;
