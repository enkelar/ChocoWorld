import mongoose from 'mongoose';
import slugify from '../utils/slugify.js';

const categorySchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    labelSq: { type: String, trim: true, default: '' },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    tagline: { type: String, trim: true, default: '' },
    taglineSq: { type: String, trim: true, default: '' },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

categorySchema.pre('validate', function () {
  if (this.label && !this.slug) {
    this.slug = slugify(this.label);
  }
});

export default mongoose.model('Category', categorySchema);