import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  ViewStyle,
} from 'react-native';
import { Colors, Fonts } from '../../styles';

type props = {
  children?: React.ReactNode;
  title?: string;
  onPress?: () => void;
  hierarchy?: 'loud' | 'quiet' | 'transparent';
  disabled?: boolean;
  appearance?: object;
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
  appearance,
  customBackground,
  size = 'normal',
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const buttonStyles: ViewStyle = {
    ...appearance,
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
    if (isDarkMode) {
      buttonStyles.backgroundColor = Colors.secondary;
    }

    textStyles.color = isDarkMode ? Colors.textNormal : Colors.textDisabled;
  }

  if (size === 'small') {
    buttonStyles.height = 32;
    buttonStyles.paddingHorizontal = 6;
    textStyles.fontSize = Fonts.size.paragraph;
    textStyles.fontFamily = Fonts.type.regular;
  }

  if (hierarchy === 'transparent') {
    textStyles.fontSize = Fonts.size.h5;
    textStyles.fontFamily = Fonts.type.regular;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyles}
      disabled={disabled}>
      <View style={styles.content}>
        <Text style={textStyles}>{children ? children : title}</Text>
      </View>
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
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.h6,
  },
});

export default Button;
