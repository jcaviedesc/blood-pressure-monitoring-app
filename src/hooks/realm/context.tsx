import { createRealmContext } from '@realm/react';
import {
  BloodPressureMeasurements,
  BloodPressureMeasurement,
} from '../../schemas/blood-pressure';

const config = {
  schema: [BloodPressureMeasurement.schema, BloodPressureMeasurements.schema],
};
export default createRealmContext(config);
