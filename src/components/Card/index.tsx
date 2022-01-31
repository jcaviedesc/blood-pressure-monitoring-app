import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../styles';

type props = {
  children: Element[] | Element;
  selected: boolean;
};

const Card: React.FC<props> = ({ children, selected = false }) => {
  const cardStyles = {
    ...styles.card,
    backgroundColor: selected ? Colors.tertiary : Colors.background,
    shadowColor: selected ? Colors.tertiary : Colors.stroke,
    elevation: selected ? 10 : 5,
  };
  return <View style={cardStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.background,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 15,
  },
});

export default Card;
