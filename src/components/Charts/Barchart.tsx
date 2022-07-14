import React from 'react';
import { View, useColorScheme } from 'react-native';
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
  const isDarkMode = useColorScheme() === 'dark';
  // TODO refactor para obtener los valores maximos y minimos en
  // una sola funcion.
  const minYaxis = getMaxOrMinValue(data, v => v.y0, 'min', 40);
  const maxYaxis = getMaxOrMinValue(data, v => v.y, 'max', 180);
  // TODO evaluar si podemos elimiar esta validacion y pasar data
  // directamente.
  const values = Array.isArray(data) && data.length ? data : DEFAULT_DATA;

  return (
    <View>
      <VictoryChart
        padding={{ top: 12, left: 0, right: 50, bottom: 40 }}
        width={Metrics.screenWidth - Metrics.marginHorizontal * 2}
        domainPadding={{ x: 18, y: 9 }}>
        <VictoryAxis
          dependentAxis
          orientation="right"
          style={{
            axis: { stroke: Colors.transparent, width: 32 },
            tickLabels: {
              fontSize: Fonts.size.paragraph,
              fontFamily: Fonts.type.regular,
              fill: Colors.paragraph,
            },
            grid: {
              stroke: isDarkMode ? Colors.paragraph : Colors.textDisabled,
            },
            ticks: { stroke: Colors.transparent, size: 12 },
          }}
          tickCount={10}
        />
        <VictoryAxis
          crossAxis
          orientation="bottom"
          style={{
            axis: { stroke: Colors.transparent },
            tickLabels: {
              fontSize: Fonts.size.hint,
              fontFamily: Fonts.type.regular,
              fill: Colors.paragraph,
            },
            grid: { stroke: Colors.transparent },
            ticks: { stroke: Colors.transparent, size: 0 },
          }}
        />
        <VictoryBar
          style={{
            data: { fill: Colors.button, width: 12 },
          }}
          // animate={{
          //   duration: 200,
          //   onLoad: { duration: 200 },
          // }}
          cornerRadius={{ top: 5, bottom: 5 }}
          data={values}
          domain={{ y: [minYaxis, maxYaxis] }}
          alignment="middle"
          events={[
            {
              childName: 'all',
              target: 'data',
              eventHandlers: {
                onClick: () => {
                  console.log('press');
                },
                onPress: () => {
                  console.log('onPress');
                },
                onPressIn: () => {
                  console.log('onPressIn');
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
