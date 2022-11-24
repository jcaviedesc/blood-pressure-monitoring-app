import { SerializedError } from '@reduxjs/toolkit/dist/createAsyncThunk';

export interface Measurement {
  name: string;
  value: number;
  unit: string;
  lastMeasurement: any;
  status: string;
  category: string;
}

export interface Patient {
  createdAt: Date;
  updatedAt: Date;
  id: string;
  name: string;
  lastName: string;
  docId: string;
  phone: string;
  address: string;
  birthdate: string;
  sex: string;
  role: number;
  avatar: string;
  age: number;
  bmi: number;
  measurements: Measurement[];
  linkedProfessionals: string[];
}

export interface ClinicalMonitoringState {
  patients: Patient[];
  loading: 'idle' | 'pending';
  currentRequestId: string | undefined;
  error: SerializedError | null;
}
