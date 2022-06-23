import { useCallback, useReducer } from 'react';
import Dayjs from '../../services/DatatimeUtil';

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
    return { sys, dia, bpm, datetime: datetime.utc().format(), observations };
  };

  const isButtonEnabled =
    state.sys.length > 0 &&
    state.dia.length > 0 &&
    isWithinRange(+state.dia, DIA_RANGE) &&
    isWithinRange(+state.sys, SYS_RANGE);

  return { state, isButtonEnabled, onChange, onEnableAddNote, selectRecord };
};
