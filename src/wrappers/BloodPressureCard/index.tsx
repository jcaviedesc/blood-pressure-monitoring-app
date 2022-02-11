import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors, Fonts, Metrics } from '../../styles';
import { LineChart } from '../../components/Charts';
import { Card } from '../../components';

type dataLine = {
  y: number;
};

type props = {
  title: string;
  value: string;
  magnitude: string;
  data: dataLine[];
};

const BloodPressureCard: React.FC<props> = ({
  title,
  value,
  magnitude,
  data,
}) => {
  return (
    <View style={styles.cardContainer}>
      <Card style={styles.overrideCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{title}</Text>
          <Icon
            name="heart-o"
            size={22}
            color={Colors.tertiary}
            style={styles.icon}
          />
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.valueText}>{value}</Text>
          <Text style={styles.magnitudeText}>{magnitude}</Text>
        </View>
        <View />
        <View>
          <LineChart
            data={data}
            width={
              (Metrics.screenWidth - Metrics.marginHorizontal * 3 - 20) / 2
            }
            height={(Metrics.screenWidth - 80) / 4}
          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: (Metrics.screenWidth - Metrics.marginHorizontal * 3) / 2,
    height: (Metrics.screenWidth - 50) / 2,
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.paragraph,
    color: Colors.headline,
  },
  valueText: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h1,
    color: Colors.button,
    marginRight: 6,
  },
  magnitudeText: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.paragraph,
    color: Colors.paragraph,
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
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  overrideCard: { paddingHorizontal: 15 },
});

export default BloodPressureCard;
