import { useCallback, useReducer } from 'react';
import { useBloodPressureMeasurement } from '../realm/useBloodPressure';
import { transformBloodPressureData } from '../../services/ChartUtils';
import Dayjs, { getWeekRange } from '../../services/DatetimeUtil';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import crashlytics from '@react-native-firebase/crashlytics';
import { parseError } from '../../services/ErrorUtils';

const initialState = {
  dateRange: ['', ''],
  weekMeasurements: [],
  todayMeasurements: [],
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
      const { dateRange, data, avgSys, avgDia, todayMeasurements } =
        action.payload;
      return {
        ...state,
        dateRange,
        weekMeasurements: data,
        avgSYSPerWeek: avgSys,
        avgDIAPerWeek: avgDia,
        todayMeasurements,
      };
    default:
      throw new Error(
        'action.type is not allowed in BloodPressureResumeReducer',
      );
  }
}

type useResumeReturn = {
  getBloodPressureData: (initialDate: string, finalDate: string) => void;
} & InitialState;

export const useBloodPressureDashboard = (): useResumeReturn => {
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
        const currentDate = Dayjs().locale(locale);
        const [dateMin, dateMax] = getWeekRange(currentDate);
        initialDate = dateMin;
        finalDate = dateMax;
      }
      try {
        const { results: queryResult, todayResult } = getMeasurements(
          initialDate,
          finalDate,
        );
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
            todayMeasurements: todayResult,
          },
        });
      } catch (error) {
        crashlytics().log(JSON.stringify(error));
        crashlytics().recordError(parseError(error));
      }
    },
    [getMeasurements, locale],
  );

  return { ...state, getBloodPressureData };
};
