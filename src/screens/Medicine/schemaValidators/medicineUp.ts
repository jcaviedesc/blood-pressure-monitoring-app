import 'fast-text-encoding';
import Joi, { ValidationErrorItem } from 'joi';

export const buildUsefulErrorObject = (errors: ValidationErrorItem) => {
  const usefulErrors = {};

  errors.map((error) => {
    if (!usefulErrors.hasOwnProperty(error.path.join('_'))) {
      usefulErrors[error.path.join('_')] = {
        type: error.type,
        msg: `errors.${error.path.join('_')}.${error.type}`,
      };
    }
  });
  return usefulErrors;
};

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

export { everySchema, specificSchema, intervalSchema };