import { useCallback } from 'react';
import {
  BloodPressureMeasurements,
  BloodPressureMeasurementType,
} from '../../schemas/blood-pressure-schema';
import { useRealmAuth } from '../../providers/RealmProvider';
import { getAverage } from '../../services/utils';
import RealmContext from './context';

const { useRealm } = RealmContext;

export const useBloodPressureMeasurement = () => {
  const realm = useRealm();
  const { realmAuthUser } = useRealmAuth();
  const bloodPressureMeasurements = realm.objects<BloodPressureMeasurementType>(
    BloodPressureMeasurements.name,
  );

  const saveMeasurement = useCallback(
    (record: { sys: number; dia: number; bpm: number; datetime: string }) => {
      const todayMeasuremnt = bloodPressureMeasurements.filtered(
        'date >= $0',
        new Date(record.datetime.split('T')[0]),
      );
      realm.write(() => {
        if (todayMeasuremnt.length > 0) {
          // update document
          todayMeasuremnt[0].records.push(record);

          const { sys, dia } = getAverage(todayMeasuremnt[0].records, [
            'sys',
            'dia',
          ]);

          todayMeasuremnt[0].sys_avg = sys;
          todayMeasuremnt[0].dia_avg = dia;
        } else {
          // create new document
          realm.create(
            BloodPressureMeasurements.name,
            BloodPressureMeasurements.generate(realmAuthUser?.id ?? '', [
              record,
            ]),
          );
        }
      });
    },
    [bloodPressureMeasurements, realm, realmAuthUser],
  );

  const getMeasurements = useCallback(
    (startDate: string, endDate: string): BloodPressureMeasurementType[] => {
      if (`${startDate}`.concat(endDate).length === 0) {
        return [];
      }
      const bloodPressureMeasurementsFiltered =
        bloodPressureMeasurements.filtered(
          'date >= $0 && date <= $1',
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
