export type ChartData = {
  x: number | string;
  y: number;
  y0: number;
};

export type LineData = {
  y: number;
};

export type ChartProps = {
  data: ChartData[] | LineData[] | undefined;
  height?: number;
  width?: number;
};
