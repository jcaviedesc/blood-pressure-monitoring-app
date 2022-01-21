import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Metrics } from '../../styles';

type boxPros = {
  title: Array<String>;
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
        <View style={{ flex: 1 }}>
          <Icon name={iconName} size={22} color={Colors.white} />
        </View>
        <View style={styles.boxTitleContainer}>
          <Text style={{ ...styles.boxTextTitle }}>{title[0]}</Text>
          <Text style={[styles.boxTextTitle, styles.boxTextTileTwo]}>
            {title[1]}
          </Text>
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
  boxContent: {
    position: 'relative',
    flex: 1,
  },
  boxTitleContainer: {
    width: '80%',
    height: 50,
    position: 'relative',
    marginBottom: 12,
  },
  boxTextTitle: {
    marginRight: 10,
    fontFamily: Fonts.type.bold,
    color: Colors.white,
    fontSize: Fonts.size.h5,
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
    fontSize: Fonts.size.h6,
    textAlign: 'left',
    textAlignVertical: 'bottom',
    lineHeight: 30,
  },
  boxBody: {
    height: 50,
  },
});

export default Box;
