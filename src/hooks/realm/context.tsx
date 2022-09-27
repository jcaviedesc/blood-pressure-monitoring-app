import { createRealmContext } from '@realm/react';
import {
  BloodPressureMeasurements,
  BloodPressureMeasurement,
} from '../../schemas/blood-pressure';

const config = {
  schema: [BloodPressureMeasurements, BloodPressureMeasurement],
  schemaVersion: 2,
  // deleteRealmIfMigrationNeeded: true,
};
export default createRealmContext(config);
