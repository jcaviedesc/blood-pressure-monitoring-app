import { setScreenLoading } from '../store/app/appSlice';
import type {
  AppDispatch,
  AppGetState,
  ClientApi,
} from '../store/configureStore';

export const saveBloodPressureRecord = ({ navigation, data }) => {
  return async function saveBloodPressureRecordThunk(
    dispatch: AppDispatch,
    getState: AppGetState,
    client: ClientApi,
  ) {
    dispatch(setScreenLoading(true));
    const response = await client.registerBloodPressureRecord(data);

    if (response.status === 201) {
      navigation.navigate('Home/BloodPressure');
    } else {
      console.log('Response ERROR', response);
      // TODO handle error message
    }
    dispatch(setScreenLoading(false));
  };
};
