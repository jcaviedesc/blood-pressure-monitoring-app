import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors, Fonts, Metrics } from '../../styles';

type props = {
  title: string;
  value: string;
  magnitude: string;
};

const Card: React.FC<props> = ({ title, value, magnitude }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{title}</Text>
          <Icon name="heart-o" size={22} color="#e1171a" style={styles.icon} />
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.valueText}>{value}</Text>
          <Text style={styles.magnitudeText}>{magnitude}</Text>
        </View>
        <View />
        {/* aqui va la grafica */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: (Metrics.screenWidth - 60) / 2,
    height: (Metrics.screenWidth - 60) / 2,
    padding: 6,
  },
  cardContent: {
    flex: 1,
    backgroundColor: Colors.background,
    shadowColor: '#211446',
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
  title: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h4,
    lineHeight: Fonts.size.h4,
    color: Colors.primary,
  },
  valueText: {
    fontFamily: Fonts.type.bold,
    fontSize: 60,
    lineHeight: 62,
    color: Colors.primary,
    marginRight: 6,
  },
  magnitudeText: {
    fontFamily: Fonts.type.regular,
    fontSize: 25,
    lineHeight: 25,
    height: 15,
    // color: Colors.secondaryText,
  },
  cardHeader: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: -3,
    right: 6,
  },
  cardBody: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
});

export default Card;
