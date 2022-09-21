import { Realm } from '@realm/react';
import { ObjectId } from 'bson';
import customDayjs from '../services/DatatimeUtil';
import { getAverage } from '../services/utils';

class BloodPressureMeasurement extends Realm.Object {
  sys!: number;
  dia!: number;
  bpm!: number;
  t!: string;
  note!: string;

  static schema = {
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
  _id!: ObjectId;
  owner_id!: string;
  start_date!: string;
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
    sysAvg?: number,
    diaAvg?: number,
    bpmAvg?: number,
  ) {
    const { sys, dia, bpm } = getAverage(measurements, ['sys', 'dia', 'bpm']);
    return {
      _id: new ObjectId(),
      owner_id: userId,
      measurements: measurements,
      sys_avg: sysAvg || sys,
      dia_avg: diaAvg || dia,
      bpm_avg: bpmAvg || bpm,
      start_date: customDayjs(measurements[0].t).format('YYYY-MM-DD'),
    };
  }

  static schema = {
    name: 'BloodPressureMeasurements',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      owner_id: 'string',
      start_date: 'date',
      measurements: { type: 'list', objectType: 'BloodPressureMeasurement' },
      sys_avg: 'float',
      dia_avg: 'float',
      bpm_avg: 'float',
    },
  };
}

export { BloodPressureMeasurements, BloodPressureMeasurement };
