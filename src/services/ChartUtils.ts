type dataObject = {
  x: number | string;
  y: number;
  y0: number;
};

type BarChartProps = {
  data: Array<dataObject>;
};

export const normalize = (value: number, isMin: boolean) => {
  return isMin ? value - (value % 10) : value + (10 - (value % 10));
};

export const getMaxOrMinValue = (
  values: BarChartProps['data'],
  selector: (value: dataObject, index: number, array: dataObject[]) => unknown,
  minVal: boolean,
) => {
  const sorted = values
    .map(selector)
    .sort((valA, valB) => valA - valB) as number[];

  const minOrMaxIndex = minVal ? 0 : sorted.length - 1;

  return normalize(sorted[minOrMaxIndex], minVal);
};
