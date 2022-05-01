import React from 'react';
import { StyleSheet, View, Text, TextStyle } from 'react-native';

type Props = {
  unit: string | number;
  styleUnit: TextStyle;
  styleActiveUnit: TextStyle;
  active: boolean;
};

const SwiperUnit: React.FC<Props> = ({
  unit,
  styleUnit,
  styleActiveUnit,
  active,
}) => {
  const unitStyles = active
    ? { ...styleUnit, ...styleActiveUnit, ...styles.activeUnit }
    : styleUnit;
  return (
    <View style={styles.swiperContainer}>
      <View style={styles.unitContainer}>
        <Text style={unitStyles}>{unit}</Text>
      </View>
      <View style={styles.swiperUnitContainer}>
        <View style={[styles.line, { height: 14 }]} />
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={{ ...styles.line, ...styles.middleLine }} />
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  swiperContainer: {
    justifyContent: 'space-between',
  },
  unitContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 18,
  },
  activeUnit: {
    transform: [
      {
        translateY: -9,
      },
      {
        scale: 1.3,
      },
    ],
    fontSize: 28,
  },
  swiperUnitContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  line: {
    width: 2,
    height: 10,
    marginRight: 5,
    backgroundColor: '#778596',
  },
  middleLine: {
    height: 18,
    backgroundColor: '#5f6c7b',
  },
});

export { SwiperUnit };
