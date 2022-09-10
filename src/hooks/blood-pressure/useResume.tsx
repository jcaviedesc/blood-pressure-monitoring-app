import { useCallback, useEffect, useReducer } from 'react';
import { useBloodPressureMeasurement } from '../realm/useBloodPressure';
import { transformBloodPressureData } from '../../services/ChartUtils';
import Dayjs, { getWeekRange } from '../../services/DatatimeUtil';
import { useI18nLocate } from '../../providers/LocalizationProvider';

const initialState = {
  dateRange: ['', ''],
  weekRecords: [],
  todayRecords: [],
  avgSYSPerWeek: 0,
  avgDIAPerWeek: 0,
};

type InitialState = typeof initialState;

function BloodPressureResumeReducer(
  state: InitialState,
  action: { type: any; payload?: any },
) {
  switch (action.type) {
    case 'updateWeekData':
      const { dateRange, data, avgSys, avgDia } = action.payload;
      return {
        ...state,
        dateRange,
        weekRecords: data,
        avgSYSPerWeek: avgSys,
        avgDIAPerWeek: avgDia,
      };
    case 'setTodayRecords':
      return { ...state, todayRecords: action.payload };
    default:
      throw new Error(
        'action.type is not allowed in BloodPressureResumeReducer',
      );
  }
}

type useResumeReturn = {
  getBloodPressureData: (initialDate: string, finalDate: string) => void;
} & InitialState;

export const useResume = (): useResumeReturn => {
  const { locale } = useI18nLocate();
  const { getMeasurements } = useBloodPressureMeasurement();
  const [state, dispatch] = useReducer(
    BloodPressureResumeReducer,
    initialState,
  );

  const getBloodPressureData = useCallback(
    (startDate: string = '', endDate: string) => {
      let initialDate = startDate;
      let finalDate = endDate;
      if (!startDate || !endDate) {
        const currentDate = Dayjs().locale(locale).startOf('w');
        const [dateMin, dateMax] = getWeekRange(currentDate);
        initialDate = dateMin;
        finalDate = dateMax;
      }
      const queryResult = getMeasurements(initialDate, finalDate);
      const { data, sysWeek, diaWeek } = transformBloodPressureData(
        queryResult,
        initialDate,
        finalDate,
      );
      dispatch({
        type: 'updateWeekData',
        payload: {
          dateRange: [initialDate, finalDate],
          data,
          avgSys: sysWeek,
          avgDia: diaWeek,
        },
      });
      const todayDate = Dayjs();
      if (Dayjs().isBetween(initialDate, finalDate)) {
        const dayOfWeekIndex = todayDate.weekday();
        dispatch({
          type: 'setTodayRecords',
          payload: data[dayOfWeekIndex]?.measurements ?? [],
        });
      }
    },
    [getMeasurements],
  );

  // useEffect(() => {
  //   const currentDate = Dayjs().locale(locale).startOf('w');
  //   const [initialDate, finalDate] = getWeekRange(currentDate);
  //   getBloodPressureData(initialDate, finalDate);
  //   console.log('me ejecuto');
  // }, []);

  return { ...state, getBloodPressureData };
};
