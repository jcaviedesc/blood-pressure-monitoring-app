import React from 'react';
import { View } from 'react-native';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory-native';
import { Colors, Fonts, Metrics } from '../../styles';
import { getMaxOrMinValue } from '../../services/ChartUtils';
import type { ChartProps } from './types';

const BarChart: React.FC<ChartProps> = ({ data }) => {
  const minYaxis = getMaxOrMinValue(data, v => v.y0, true);
  const maxYaxis = getMaxOrMinValue(data, v => v.y, false);

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
              color: Colors.paragraph,
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
          data={data}
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
