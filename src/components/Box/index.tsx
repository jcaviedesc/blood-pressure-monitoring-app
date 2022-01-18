import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Text, View, StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../styles';

type boxPros = {
  title: Array<String>;
  status: string;
  value: string;
  colors: Array<string>;
};
const Box: React.FC<boxPros> = ({ title, status, value, colors }) => {
  return (
    <LinearGradient
      colors={colors}
      start={{
        x: 0,
        y: 0,
      }}
      end={{
        x: 1,
        y: 1,
      }}
      style={styles.box}>
      <View style={styles.boxTitleContainer}>
        <Text style={{ ...styles.boxTextTitle }}>{title[0]}</Text>
        <Text style={[styles.boxTextTitle, styles.boxTextTileTwo]}>
          {title[1]}
        </Text>
      </View>
      <Text style={styles.boxText}>{status}</Text>
      <Text style={styles.boxText}>{value}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  box: {
    width: (Metrics.screenWidth - 60) / 2,
    height: 200,
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 18,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  boxTitleContainer: {
    width: '80%',
    height: 60,
    position: 'relative',
    marginBottom: 12,
  },
  boxTextTitle: {
    marginRight: 10,
    fontFamily: Fonts.type.bold,
    color: Colors.white,
    fontSize: Fonts.size.h2,
    textAlign: 'justify',
    lineHeight: 38,
  },
  boxTextTileTwo: {
    position: 'absolute',
    top: 30,
  },
  boxText: {
    fontFamily: Fonts.type.regular,
    color: Colors.white,
    fontSize: Fonts.size.h3,
    textAlign: 'left',
    textAlignVertical: 'bottom',
    lineHeight: 30,
  },
});

export default Box;
