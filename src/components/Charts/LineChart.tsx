import React from 'react';
import { VictoryLine, VictoryGroup } from 'victory-native';
import { Colors } from '../../styles';
import { getMaxOrMinValue } from '../../services/ChartUtils';
import type { ChartProps } from './types';

const LineChart: React.FC<ChartProps> = ({
  data,
  height = 300,
  width = 350,
}) => {
  const minYaxis = getMaxOrMinValue(data, v => v.y0, true);
  const maxYaxis = getMaxOrMinValue(data, v => v.y, false);
  return (
    <VictoryGroup
      width={width}
      height={height}
      padding={{ top: 12, bottom: 12, left: 0, right: 0 }}
      color={Colors.button}
      domainPadding={{ x: 18, y: 9 }}>
      <VictoryLine
        data={data}
        interpolation="cardinal"
        maxDomain={maxYaxis}
        minDomain={minYaxis}
      />
    </VictoryGroup>
  );
};

export default LineChart;
