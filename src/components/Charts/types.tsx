export type ChartData = {
  x: number | string;
  y: number;
  y0: number;
};

export type ChartProps = {
  data: ChartData[];
  height?: number;
  width?: number;
};
