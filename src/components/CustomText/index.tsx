import React from 'react';
import { Text as RNText, TextProps, useColorScheme } from 'react-native';
import { Colors } from '../../styles';

interface TextWrapperProps extends TextProps {
  darkColor?: string;
}

export const Text: React.FC<TextWrapperProps> = ({
  style,
  darkColor,
  children,
  ...textProps
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  let localStyles = {};
  if (isDarkMode) {
    localStyles = {
      color: darkColor || Colors.textNormal,
    };
  }

  return (
    <RNText
      {...textProps}
      style={[{ color: Colors.headline }, style, localStyles]}>
      {children}
    </RNText>
  );
};
