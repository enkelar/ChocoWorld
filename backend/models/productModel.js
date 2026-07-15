import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    nameSq: { type: String, trim: true, default: '' },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true, trim: true, lowercase: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, trim: true, default: '' },
    descriptionSq: { type: String, trim: true, default: '' },
    ingredients: { type: String, trim: true, default: '' },
    ingredientsSq: { type: String, trim: true, default: '' },
    allergens: { type: [String], default: [] },
    image: { type: String, default: null },
    displayOrder: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

productSchema.index({ category: 1 });

export default mongoose.model('Product', productSchema);
