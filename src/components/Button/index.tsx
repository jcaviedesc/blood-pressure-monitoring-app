import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
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
  const isDarkMode = useColorScheme() === 'dark';
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
    if (hierarchy !== 'transparent') {
      buttonStyles.backgroundColor = isDarkMode
        ? Colors.darkCardBackground
        : Colors.buttonDisabled;
    }
    textStyles.color = isDarkMode ? Colors.textNormal : Colors.textDisabled;
  }

  if (size === 'small') {
    buttonStyles.height = 32;
    buttonStyles.paddingHorizontal = 6;
    textStyles.fontSize = Fonts.size.paragraph;
    textStyles.fontFamily = Fonts.type.regular;
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
