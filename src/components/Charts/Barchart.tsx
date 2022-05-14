import React from 'react';
import { View } from 'react-native';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory-native';
import { Colors, Fonts, Metrics } from '../../styles';
import { getMaxOrMinValue } from '../../services/ChartUtils';
import type { ChartProps } from './types';

const DEFAULT_DATA = [
  { x: 'Lun', y: 0 },
  { x: 'Mar', y: 0 },
  { x: 'Mie', y: 0 },
  { x: 'Jue', y: 0 },
  { x: 'Vie', y: 0 },
  { x: 'Sab', y: 0 },
  { x: 'Dom', y: 0 },
];

const BarChart: React.FC<ChartProps> = ({ data }) => {
  const minYaxis = data ? getMaxOrMinValue(data, v => v.y0, true) : 40;
  const maxYaxis = data ? getMaxOrMinValue(data, v => v.y, false) : 180;

  const values = Array.isArray(data) && data.length ? data : DEFAULT_DATA;

  return (
    <View>
      <VictoryChart
        padding={{ top: 20, left: 0, right: 50, bottom: 50 }}
        width={Metrics.screenWidth - Metrics.marginHorizontal * 2}
        domainPadding={{ x: 18, y: 9 }}>
        <VictoryAxis
          dependentAxis
          orientation="right"
          style={{
            axis: { stroke: Colors.transparent, width: 32 },
            tickLabels: {
              fontSize: 16,
              fontFamily: Fonts.type.regular,
              fill: Colors.paragraph,
            },
            grid: { stroke: Colors.lightGray },
            ticks: { stroke: Colors.transparent, size: 12 },
          }}
        />
        <VictoryAxis
          crossAxis
          orientation="bottom"
          style={{
            axis: { stroke: Colors.transparent },
            tickLabels: {
              fontSize: 16,
              fontFamily: Fonts.type.regular,
              fill: Colors.paragraph,
            },
            grid: { stroke: Colors.transparent },
            ticks: { stroke: Colors.transparent, size: 0 },
          }}
        />
        <VictoryBar
          style={{
            data: { fill: Colors.button, width: 9 },
          }}
          cornerRadius={{ top: 5, bottom: 5 }}
          data={values}
          domain={{ y: [minYaxis, maxYaxis] }}
          alignment="middle"
          events={[
            {
              target: 'data',
              eventHandlers: {
                onPress: () => {
                  console.log('press');
                },
              },
            },
          ]}
        />
      </VictoryChart>
    </View>
  );
};

export default BarChart;
