import Joi from 'joi';

export const categoryCreateSchema = Joi.object({
  label: Joi.string().trim().min(1).max(60).required(),
  labelSq: Joi.string().trim().allow('').max(60),
  slug: Joi.string().trim().lowercase().pattern(/^[a-z0-9-]+$/).allow(''),
  tagline: Joi.string().trim().allow('').max(120),
  taglineSq: Joi.string().trim().allow('').max(120),
  displayOrder: Joi.number().integer(),
});

export const categoryUpdateSchema = categoryCreateSchema.fork(
  ['label'],
  (schema) => schema.optional()
);