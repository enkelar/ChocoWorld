import Joi from 'joi';

export const productCreateSchema = Joi.object({
  name: Joi.string().trim().min(1).max(120).required(),
  nameSq: Joi.string().trim().allow('').max(120),
  slug: Joi.string().trim().lowercase().pattern(/^[a-z0-9-]+$/).optional(),
  category: Joi.string().trim().lowercase().required(),
  price: Joi.number().min(0).required(),
  description: Joi.string().allow('').max(1000),
  descriptionSq: Joi.string().allow('').max(1000),
  ingredients: Joi.string().allow('').max(500),
  ingredientsSq: Joi.string().allow('').max(500),
  allergens: Joi.array().items(Joi.string().trim()),
  image: Joi.string().uri().allow('', null),
  displayOrder: Joi.number().integer(),
  featured: Joi.boolean(),
  bestSeller: Joi.boolean(),
});


export const productUpdateSchema = productCreateSchema.fork(
  ['name', 'category', 'price'],
  (schema) => schema.optional()
);