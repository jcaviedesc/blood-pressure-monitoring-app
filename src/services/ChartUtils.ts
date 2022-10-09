import { BloodPressureMeasurements } from '../schemas/blood-pressure';
import Dayjs from './DatetimeUtil';
import { getAverage } from './utils';

type DataObject = {
  x?: number | string;
  y: number;
  y0?: number;
  records?: unknown[];
};

type BarChartProps = {
  data: DataObject[];
};

export const normalize = (value: number, flag: 'min' | 'max') => {
  return flag === 'min' ? value - (value % 5) : value + (5 - (value % 5));
};

export const getMaxOrMinValue = (
  values: BarChartProps['data'],
  selector: (
    value: DataObject,
    index?: number,
    array?: DataObject[],
  ) => unknown,
  flag: 'min' | 'max',
  altValue: number,
) => {
  const sorted = values
    .filter(v => selector(v) !== 0)
    .map(selector)
    .sort((valA, valB) => valA - valB) as number[];

  if (sorted.length < 1) {
    return altValue;
  }

  const minOrMaxIndex = flag === 'min' ? 0 : sorted.length - 1;
  const normalizeRange = normalize(sorted[minOrMaxIndex], flag);
  return normalizeRange !== 0 ? normalizeRange : altValue;
};

export const transformBloodPressureData = (
  data: BloodPressureMeasurements[],
  initialDate: string,
  finalDate: string,
) => {
  const defaultData = generateWeekBarCharDefaultData(initialDate, finalDate);
  if (data.length < 1) {
    return {
      data: defaultData,
      sysWeek: 0,
      diaWeek: 0,
    };
  }
  const { sys_avg: sysWeek, dia_avg: diaWeek } = getAverage(data, [
    'sys_avg',
    'dia_avg',
  ]);

  let mergeData = defaultData;

  data.forEach(measurentment => {
    const measurentmentDate = Dayjs(measurentment.start_date).utc();
    const weekDayData = {
      x: measurentmentDate.format('DD[\n]MMM'),
      y: measurentment.sys_avg,
      y0: measurentment.dia_avg,
      measurements: measurentment.measurements,
    };
    const dayOfWeekIndex = measurentmentDate.weekday();
    mergeData[dayOfWeekIndex] = weekDayData;
  });

  return {
    data: mergeData,
    sysWeek,
    diaWeek,
  };
};

const generateWeekBarCharDefaultData = (
  initialDate: string,
  finalDate: string,
) => {
  let startDate = Dayjs(initialDate);
  const endDate = Dayjs(finalDate);
  const defaultData = [];
  while (startDate.isBefore(endDate)) {
    const dataObject = {
      x: startDate.format('DD[\n]MMM'),
      y: 0,
      y0: 0,
    };
    defaultData.push(dataObject);

    startDate = startDate.add(1, 'day');
  }
  defaultData.push({
    x: startDate.format('DD[\n]MMM'),
    y: 0,
    y0: 0,
  });
  return defaultData;
};
