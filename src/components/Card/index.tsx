import React from 'react';
import {
  View,
  StyleSheet,
  useColorScheme,
  ColorSchemeName,
} from 'react-native';
import { Colors } from '../../styles';

type stylesPros = {
  padding?: number;
  paddingHorizontal?: number;
};

type props = {
  children: Element[] | Element;
  selected?: boolean;
  style?: stylesPros;
};

const backgroundColorPick = (mode: ColorSchemeName) => {
  if (mode && ['dark', 'light'].includes(mode)) {
    const colorModes = {
      light: Colors.cardBackground,
      dark: Colors.darkCardBackground,
    };
    return colorModes[mode];
  }
  return Colors.cardBackground;
};

const Card: React.FC<props> = ({ children, selected = false, style }) => {
  const colorMode = useColorScheme();
  const cardStyles = {
    ...styles.card,
    ...style,
    backgroundColor: selected
      ? Colors.tertiary
      : backgroundColorPick(colorMode),
  };
  return <View style={cardStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 15,
  },
});

export default Card;
