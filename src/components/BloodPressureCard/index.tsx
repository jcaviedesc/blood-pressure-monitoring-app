import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { VictoryLine, VictoryGroup } from 'victory-native';
import { Colors, Fonts, Metrics } from '../../styles';

type props = {
  title: string;
  value: string;
  magnitude: string;
  data: Array<object | Array<number>>;
};

// const data = [
//   { x: 1, y: 2 },
//   { x: 2, y: 3 },
//   { x: 3, y: 5 },
//   { x: 4, y: 4 },
//   { x: 5, y: 7 },
// ];

const Card: React.FC<props> = ({ title, value, magnitude, data }) => {
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
        <View>
          <VictoryGroup
            width={(Metrics.screenWidth - 60) / 2}
            height={50}
            style={{ parent: { padding: 0, margin: 0 } }}>
            <VictoryLine
              data={data}
              style={{ data: { stroke: Colors.tertiary } }}
            />
            {/* <VictoryAxis
              style={{
                axis: { stroke: "transparent" },
                ticks: { stroke: "transparent" },
                tickLabels: { fill: "transparent" }
              }}
            /> */}
          </VictoryGroup>
        </View>
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
    fontSize: Fonts.size.h6,
    color: Colors.primary,
  },
  valueText: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h2,
    color: Colors.primary,
    marginRight: 6,
  },
  magnitudeText: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h5,
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
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
});

export default Card;
