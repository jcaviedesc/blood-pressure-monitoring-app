import React from 'react';
import {
  Text as RNText,
  TextStyle,
  StyleProp,
  useColorScheme,
} from 'react-native';
import { Colors } from '../../styles';

type TextProps = {
  style: StyleProp<TextStyle>;
  darkColor?: string;
  children: React.ReactNode;
};

export const Text: React.FC<TextProps> = ({
  style,
  darkColor,
  children,
  ...textProps
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  let localStyles = {};
  if (isDarkMode) {
    localStyles.color = darkColor || Colors.textNormal;
  }

  return (
    <RNText {...textProps} style={[style, localStyles]}>
      {children}
    </RNText>
  );
};
