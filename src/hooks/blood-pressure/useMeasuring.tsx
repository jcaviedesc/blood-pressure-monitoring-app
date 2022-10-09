import { useCallback, useEffect, useReducer } from 'react';
import Dayjs from '../../services/DatetimeUtil';

const initialState = {
  sys: '',
  dia: '',
  bpm: '',
  datetime: Dayjs(),
  observations: '',
  addNoteEnabled: false,
};

function BloodPressureFormReducer(
  state: typeof initialState,
  action: { type: any; payload?: any },
) {
  switch (action.type) {
    case 'onChange':
      const { field, value } = action.payload;
      return { ...state, [field]: value };
    case 'enableAddNote':
      return { ...state, addNoteEnabled: true };
    case 'initDatetime':
      return { ...state, datetime: Dayjs() };
    default:
      throw new Error();
  }
}

const SYS_RANGE = [60, 240];
const DIA_RANGE = [30, 240];

function isWithinRange(value: number, range: number[]) {
  const [min, max] = range;
  return value >= min && value <= max;
}

export const useMeasuringForm = () => {
  const [state, dispatch] = useReducer(BloodPressureFormReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'initDatetime' });
  }, []);

  const onChange = useCallback(
    (field: keyof typeof initialState, value: string) => {
      dispatch({ type: 'onChange', payload: { field, value } });
    },
    [dispatch],
  );

  const onEnableAddNote = useCallback(() => {
    dispatch({ type: 'enableAddNote' });
  }, [dispatch]);

  const selectRecord = () => {
    const { sys, dia, bpm, datetime, observations } = state;
    return {
      sys: +sys,
      dia: +dia,
      bpm: +bpm,
      t: datetime.utc().format(),
      note: observations,
    };
  };

  // TODO dia < sys
  const isButtonEnabled =
    state.sys.length > 0 &&
    state.dia.length > 0 &&
    isWithinRange(+state.dia, DIA_RANGE) &&
    isWithinRange(+state.sys, SYS_RANGE) &&
    Number(state.dia) < Number(state.sys);

  return { state, isButtonEnabled, onChange, onEnableAddNote, selectRecord };
};
