import { useCallback } from 'react';
import {
  BloodPressureMeasurements,
  BloodPressureMeasurementsType,
  BloodPressureMeasurement,
} from '../../schemas/blood-pressure-schema';
import { useRealmAuth } from '../../providers/RealmProvider';
import { getAverage } from '../../services/utils';
import RealmContext from './context';

const { useRealm } = RealmContext;

export const useBloodPressureMeasurement = () => {
  const realm = useRealm();
  const { realmAuthUser } = useRealmAuth();
  const bloodPressureMeasurements =
    realm.objects<BloodPressureMeasurementsType>(
      BloodPressureMeasurements.name,
    );

  const saveMeasurement = useCallback(
    (measurement: BloodPressureMeasurement) => {
      const todayMeasuremnt = bloodPressureMeasurements.filtered(
        'start_date >= $0',
        new Date(measurement.t.split('T')[0]),
      );
      realm.write(() => {
        if (todayMeasuremnt.length > 0) {
          // update document
          todayMeasuremnt[0].measurements.push(measurement);

          const { sys, dia, bpm } = getAverage(
            todayMeasuremnt[0].measurements,
            ['sys', 'dia', 'bpm'],
          );

          todayMeasuremnt[0].sys_avg = sys;
          todayMeasuremnt[0].dia_avg = dia;
          todayMeasuremnt[0].bpm_avg = bpm;
        } else {
          // create new document
          realm.create(
            BloodPressureMeasurements.name,
            BloodPressureMeasurements.generate(realmAuthUser?.id ?? '', [
              measurement,
            ]),
          );
        }
      });
    },
    [bloodPressureMeasurements, realm, realmAuthUser],
  );

  const getMeasurements = useCallback(
    (startDate: string, endDate: string): BloodPressureMeasurementsType[] => {
      if (`${startDate}`.concat(endDate).length === 0) {
        return [];
      }
      const bloodPressureMeasurementsFiltered =
        bloodPressureMeasurements.filtered(
          'start_date >= $0 && start_date <= $1',
          new Date(startDate),
          new Date(endDate),
        );
      return bloodPressureMeasurementsFiltered.toJSON();
    },
    [bloodPressureMeasurements],
  );

  return {
    getMeasurements,
    saveMeasurement,
  };
};
