import React from 'react';
import { StyleSheet, View, Text, TextStyle } from 'react-native';

type Props = {
  unit: string | number;
  styleUnit: TextStyle;
};

const SwiperUnit: React.FC<Props> = ({ unit, styleUnit }) => {
  return (
    <View style={styles.swiperContainer}>
      <View style={styles.unitContainer}>
        <Text style={styleUnit}>{unit}</Text>
      </View>
      <View style={styles.swiperUnitContainer}>
        <View style={styles.line} />
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
  },
  swiperUnitContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  line: {
    width: 2,
    height: 10,
    marginRight: 5,
    backgroundColor: 'gray',
  },
  middleLine: {
    height: 18,
  },
});

export { SwiperUnit };
