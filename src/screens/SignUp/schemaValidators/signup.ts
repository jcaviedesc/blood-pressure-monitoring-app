import 'fast-text-encoding';
import Joi from 'joi';

const transformError = (error: { details: any[] }) =>
  error.details.reduce((prev, curr) => {
    prev[curr.path[0]] = curr.message;
    return prev;
  }, {});

const signUpSchema = Joi.object({
  fullName: Joi.string().required(),
  docId: Joi.string().pattern(new RegExp('^[0-9]*$')),
  phone: Joi.string().required(),
});

const birthdateSchema = Joi.string().required();

export { signUpSchema, birthdateSchema, transformError };
