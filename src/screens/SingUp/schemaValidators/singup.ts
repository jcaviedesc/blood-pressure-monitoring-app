import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true }); // options can be passed, e.g. {allErrors: true}

const schema = {
  type: 'object',
  properties: {
    fullName: { type: 'string' },
    phone: { type: 'string' },
    address: { type: 'string' },
  },
  required: ['fullName', 'phone', 'address'],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

export { ajv };
export default validate;
