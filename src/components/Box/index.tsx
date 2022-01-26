import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Metrics } from '../../styles';

type boxPros = {
  title: string;
  status: string;
  value: string;
  colors: Array<string>;
  onPress?: Function;
  iconName: 'heartbeat' | 'tint' | 'eyedropper' | 'balance-scale';
};
const Box: React.FC<boxPros> = ({
  title,
  status,
  value,
  colors,
  iconName,
  onPress,
}) => {
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
      <TouchableOpacity onPress={onPress} style={styles.boxContent}>
        <View style={styles.iconContainer}>
          <Icon name={iconName} size={22} color={Colors.white} />
        </View>
        <View style={styles.boxTitleContainer}>
          <Text style={styles.boxTextTitle}>{title}</Text>
        </View>
        <View style={styles.boxBody}>
          <Text style={styles.boxText}>{status}</Text>
          <Text style={styles.boxText}>{value}</Text>
        </View>
      </TouchableOpacity>
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
    position: 'relative',
  },
  iconContainer: {
    flex: 1,
  },
  boxContent: {
    flex: 1,
  },
  boxTitleContainer: {
    width: '80%',
    position: 'relative',
  },
  boxTextTitle: {
    marginRight: 10,
    fontFamily: Fonts.type.bold,
    color: Colors.white,
    fontSize: 22,
    textAlign: 'left',
  },
  boxText: {
    fontFamily: Fonts.type.regular,
    color: Colors.white,
    fontSize: Fonts.size.h6,
    textAlign: 'left',
    textAlignVertical: 'bottom',
    lineHeight: 30,
    textShadowColor: Colors.paragraph,
    textShadowOffset: {
      width: 0.5,
      height: 0.5,
    },
    textShadowRadius: 0.5,
  },
  boxBody: {
    height: 50,
  },
});

export default Box;
