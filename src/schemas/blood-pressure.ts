import { Realm } from '@realm/react';
import { ObjectSchema } from 'realm';
import customDayjs from '../services/DatetimeUtil';
import { getAverage } from '../services/utils';

class BloodPressureMeasurement {
  sys!: number;
  dia!: number;
  bpm!: number;
  t!: string;
  note!: string;

  public static schema: ObjectSchema = {
    name: 'BloodPressureMeasurement',
    embedded: true,
    properties: {
      sys: 'int',
      dia: 'int',
      bpm: 'int',
      t: 'date',
      note: 'string?',
    },
  };
}
class BloodPressureMeasurements extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  owner_id!: string;
  start_date!: string; // string date UTC
  end_date!: string; // string date UTC
  measurements!: BloodPressureMeasurement[];
  sys_avg!: number;
  dia_avg!: number;
  bpm_avg!: number;

  static generate(
    userId: string,
    measurements: {
      sys: any;
      dia: any;
      bpm: any;
      t: any;
      note?: string;
    }[],
  ) {
    const { sys, dia, bpm } = getAverage(measurements, ['sys', 'dia', 'bpm']);
    const startTimestamp = customDayjs(measurements[0].t);
    const EndTimestamp = startTimestamp.endOf('day').utc().format();
    return {
      _id: new Realm.BSON.ObjectId(),
      owner_id: userId || '_SYNC_DISABLED_',
      measurements: measurements,
      sys_avg: sys,
      dia_avg: dia,
      bpm_avg: bpm,
      start_date: startTimestamp.utc().format(),
      end_date: EndTimestamp,
    };
  }

  public static schema: ObjectSchema = {
    name: 'BloodPressureMeasurements',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      owner_id: 'string',
      start_date: 'date',
      end_date: 'date',
      measurements: 'BloodPressureMeasurement[]',
      sys_avg: 'float',
      dia_avg: 'float',
      bpm_avg: 'float',
    },
  };
}

export { BloodPressureMeasurement, BloodPressureMeasurements };
