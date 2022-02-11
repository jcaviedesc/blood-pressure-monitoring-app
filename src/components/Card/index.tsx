import React from 'react';
import { View, StyleSheet } from 'react-native';
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

const Card: React.FC<props> = ({ children, selected = false, style }) => {
  const cardStyles = {
    ...styles.card,
    ...style,
    backgroundColor: selected ? Colors.tertiary : Colors.background,
    shadowColor: selected ? Colors.tertiary : Colors.stroke,
    elevation: selected ? 10 : 3,
  };
  return <View style={cardStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 15,
  },
});

export default Card;
