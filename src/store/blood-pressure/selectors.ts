import type { RootState } from '../configureStore';
import type { TotalRecords } from './types';

export const selectCurrentRecord = (state: RootState) =>
  state.bloodPressure.currentRecord;

export const selectTotalRecords = (state: RootState): TotalRecords => {
  const totalRecords = state.bloodPressure.records.length;
  return { totalRecords, isMeasuringComplete: totalRecords % 2 > 0 };
};

export const selectResumeRecords = (state: RootState) => {
  const totalRecords = state.bloodPressure.records.length;
  let records = state.bloodPressure.records;
  if (totalRecords > 2) {
    records = state.bloodPressure.records.slice(0, 2);
  }
  const transformRecords = records.map(({ sys, dia, bpm }) => {
    return {
      bloodPressure: `${sys}/${dia} mmHg`,
      heartRate: `${bpm} pul/min`,
    };
  });
  return transformRecords;
};

export const selectBloodPressureMeasuring = (state: RootState) => {
  const { records, observations } = state.bloodPressure;
  return {
    records: records.slice(0, 2),
    why: observations,
  };
};

export const selectRecordPerWeek = (state: RootState) =>
  state.bloodPressure?.recordsPerWeek ?? {};
