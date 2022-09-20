import 'fast-text-encoding';
import Joi from 'joi';

const transformError = (error: { details: any[] }) =>
  error.details.reduce((prev, curr) => {
    prev[curr.path[0]] = curr.message;
    return prev;
  }, {});

const everySchema = Joi.object({
  name: Joi.string().required(),
  apparience: Joi.string().required(),
  value: Joi.string().required(),
  unit: Joi.string().required(),
  via: Joi.string().required(),
  frecuency: Joi.string().required(),
  times_per_day: Joi.number().min(1).max(24).required(),
  times: Joi.array().items(Joi.string().min(1).required()),
});

const specificSchema = Joi.object({
  name: Joi.string().required(),
  apparience: Joi.string().required(),
  value: Joi.string().required(),
  unit: Joi.string().required(),
  via: Joi.string().required(),
  frecuency: Joi.string().required(),
  times_per_day: Joi.number().min(1).max(24).required(),
  times: Joi.array().items(Joi.string().min(1).required()),
  days: Joi.array().items(Joi.string().min(1).required()),
});

const intervalSchema = Joi.object({
  name: Joi.string().required(),
  apparience: Joi.string().required(),
  value: Joi.string().required(),
  unit: Joi.string().required(),
  via: Joi.string().required(),
  frecuency: Joi.string().required(),
  times_per_day: Joi.number().min(1).max(24).required(),
  every: Joi.number().required(),
  times: Joi.array().items(Joi.string().min(1).required()),
});

export { everySchema, specificSchema, intervalSchema, transformError };