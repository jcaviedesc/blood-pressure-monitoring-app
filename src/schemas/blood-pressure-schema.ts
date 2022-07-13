import { Realm } from '@realm/react';
import { ObjectId } from 'bson';
import customDayjs from '../services/DatatimeUtil';
import { getAverage } from '../services/utils';

export interface BloodPressureMeasurementType {
  _id: ObjectId;
  owner_id: string;
  date: string;
  records: {
    sys: number;
    dia: number;
    bpm: number;
    datetime: string;
  }[];
  sys_avg: number;
  dia_avg: number;
}
class BloodPressureMeasurements extends Realm.Object {
  _id!: ObjectId;
  owner_id!: string;
  date!: string;
  records: {
    sys: any;
    dia: any;
    bpm: any;
    datetime: any;
  }[] = [];
  sys_avg!: number;
  dia_avg!: number;

  static generate(
    userId: string,
    records: {
      sys: any;
      dia: any;
      bpm: any;
      datetime: any;
    }[],
    sysAvg?: number,
    diaAvg?: number,
  ) {
    const { sys, dia } = getAverage(records, ['sys', 'dia']);
    return {
      _id: new ObjectId(),
      owner_id: userId,
      records: records,
      sys_avg: sysAvg || sys,
      dia_avg: diaAvg || dia,
      date: customDayjs(records[0].datetime).format('YYYY-MM-DD'),
    };
  }

  static bloodPressureRecordSchema = {
    name: 'BloodPressureRecord',
    embedded: true,
    properties: {
      sys: 'int',
      dia: 'int',
      bpm: 'int',
      datetime: 'date',
    },
  };

  static schema = {
    name: 'BloodPressureMeasurements',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      owner_id: 'string',
      date: 'date',
      records: { type: 'list', objectType: 'BloodPressureRecord' },
      sys_avg: 'int',
      dia_avg: 'int',
    },
  };
}

export { BloodPressureMeasurements };
