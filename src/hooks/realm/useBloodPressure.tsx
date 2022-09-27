import { useCallback } from 'react';
import {
  BloodPressureMeasurements,
  BloodPressureMeasurement,
} from '../../schemas/blood-pressure';
import { useRealmAuth } from '../../providers/RealmProvider';
import { getAverage } from '../../services/utils';
import RealmContext from './context';
import { useAppDispatch } from '../useRedux';
import { setLastMeasurement } from '../../thunks/users-thunk';
import Dayjs from '../../services/DatatimeUtil';

const { useRealm, useQuery } = RealmContext;

export const useBloodPressureMeasurement = () => {
  const dispatch = useAppDispatch();
  const realm = useRealm();
  const { realmAuthUser } = useRealmAuth();
  // change to bucket pattern and upsert documents
  const bloodPressureMeasurements = useQuery(BloodPressureMeasurements);

  const saveMeasurement = useCallback(
    (measurement: BloodPressureMeasurement) => {
      // save como utc y show como localTime
      realm.write(() => {
        const timestamp = new Date(measurement.t);
        const todayMeasurement = bloodPressureMeasurements.filtered(
          '$0 >= start_date && $0 <= end_date',
          timestamp,
        );
        if (todayMeasurement.length > 0) {
          // update document
          todayMeasurement[0].measurements.push(measurement);

          const { sys, dia, bpm } = getAverage(
            todayMeasurement[0].measurements,
            ['sys', 'dia', 'bpm'],
          );

          todayMeasurement[0].sys_avg = sys;
          todayMeasurement[0].dia_avg = dia;
          todayMeasurement[0].bpm_avg = bpm;
        } else {
          // create new document
          const newMeasurement = BloodPressureMeasurements.generate(
            realmAuthUser?.id ?? '',
            [measurement],
          );
          realm.create('BloodPressureMeasurements', newMeasurement);
        }
      });

      const transformedMeasurement = {
        category: 'Heart',
        lastMeasurement: measurement.t,
        name: 'BloodPressure',
        status: 'normal',
        unit: 'mmHg',
        value: `${measurement.sys}/${measurement.dia}`,
      };

      dispatch(setLastMeasurement(transformedMeasurement));
    },
    /*eslint-disable react-hooks/exhaustive-deps */
    [bloodPressureMeasurements, realm, realmAuthUser],
  );

  const getMeasurements = useCallback(
    (
      startDate: string,
      endDate: string,
    ): {
      results: BloodPressureMeasurements[];
      todayResult: BloodPressureMeasurement;
    } => {
      if (`${startDate}`.concat(endDate).length === 0) {
        return { results: [], todayResult: [] };
      }
      let todayBloodPressureMeasurements = [];

      const bloodPressureMeasurementsFiltered = bloodPressureMeasurements
        .filtered(
          'start_date >= $0 && end_date <= $1',
          new Date(startDate),
          new Date(endDate),
        )
        .map(measurement => {
          const parseMeasurement = {
            _id: measurement._objectId(),
            owner_id: measurement.owner_id,
            start_date: measurement.start_date,
            end_date: measurement.end_date,
            measurements: measurement.measurements.map(record => ({
              sys: record.sys,
              dia: record.dia,
              bpm: record.bpm,
              t: record.t,
              note: record.note,
            })),
            sys_avg: measurement.sys_avg,
            dia_avg: measurement.dia_avg,
            bpm_avg: measurement.bpm_avg,
          };
          if (Dayjs().isBetween(measurement.start_date, measurement.end_date)) {
            todayBloodPressureMeasurements = parseMeasurement.measurements;
          }
          return parseMeasurement;
        });

      console.log({
        bloodPressureMeasurementsFiltered,
        todayBloodPressureMeasurements,
      });
      // TODO fix type
      return {
        results: bloodPressureMeasurementsFiltered,
        todayResult: todayBloodPressureMeasurements,
      };
    },
    [bloodPressureMeasurements],
  );

  return {
    getMeasurements,
    saveMeasurement,
  };
};
