import React, { useCallback } from 'react';
import { View } from 'react-native';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory-native';
import { Colors, Fonts, Metrics } from '../../styles';

type dataObject = {
  x: number;
  y: number;
  y0: number;
};

type BarChartProps = {
  data: Array<dataObject>;
  xLabels: string[];
  xValues: number[];
};

const BarChart: React.FC<BarChartProps> = ({
  data,
  xLabels = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
  xValues = [1, 2, 3, 4, 5, 6, 7],
}) => {
  const normalize = (value: number, isMin: boolean) => {
    return isMin ? value - (value % 10) : value + (10 - (value % 10));
  };

  const getMaxValue = useCallback(
    (
      values: BarChartProps['data'],
      selector: (
        value: dataObject,
        index: number,
        array: dataObject[],
      ) => unknown,
      minVal: boolean,
    ) => {
      const sorted = values
        .map(selector)
        .sort((valA, valB) => valA - valB) as number[];

      const minOrMaxIndex = minVal ? 0 : sorted.length - 1;

      return normalize(sorted[minOrMaxIndex], minVal);
    },
    [],
  );

  const minYaxis = getMaxValue(data, v => v.y0, true);
  const maxYaxis = getMaxValue(data, v => v.y, false);

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
          tickValues={xValues}
          tickFormat={xLabels}
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
