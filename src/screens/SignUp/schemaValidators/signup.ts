import 'fast-text-encoding';
import Joi from 'joi';

const transformError = (error: { details: any[] }) =>
  error.details.reduce((prev, curr) => {
    prev[curr.path[0]] = curr.message;
    return prev;
  }, {});

const signUpSchema = Joi.object({
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  docId: Joi.string().alphanum().required(),
});

const birthdateSchema = Joi.string().required();

export { signUpSchema, birthdateSchema, transformError };
