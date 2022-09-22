import { createRealmContext } from '@realm/react';
import {
  BloodPressureMeasurements,
  BloodPressureMeasurement,
} from '../../schemas/blood-pressure';

const config = {
  schema: [BloodPressureMeasurement, BloodPressureMeasurements],
  // deleteRealmIfMigrationNeeded: true,
};
export default createRealmContext(config);
