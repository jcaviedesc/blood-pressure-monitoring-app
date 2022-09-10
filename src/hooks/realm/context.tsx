import { createRealmContext } from '@realm/react';
import { BloodPressureMeasurements } from '../../schemas/blood-pressure-schema';

const config = {
  schema: [
    BloodPressureMeasurements.schema,
    BloodPressureMeasurements.bloodPressureMeasurementSchema,
  ],
};
export default createRealmContext(config);
