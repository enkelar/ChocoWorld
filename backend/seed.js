import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './db.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Category from './models/categoryModel.js';

dotenv.config();

const categories = [
  { label: 'Waffles', slug: 'waffles', tagline: 'Crisp Belgian, drenched in cocoa', displayOrder: 1 },
  { label: 'Pancakes', slug: 'pancakes', tagline: 'Velvet stacks, soft and warm', displayOrder: 2 },
  { label: 'Crêpes', slug: 'crepes', tagline: 'Thin, delicate, indulgent', displayOrder: 3 },
  { label: 'Cold Drinks', slug: 'cold-drinks', tagline: 'Iced, blended, refreshing', displayOrder: 4 },
];

const products = [
  // Waffles
  {
    name: 'Velvet Belgian Waffle',
    slug: 'velvet-belgian-waffle',
    category: 'waffles',
    price: 4.5,
    description: 'Crisp Belgian waffle drizzled with molten dark chocolate.',
    ingredients: 'Belgian waffle batter, dark chocolate, butter',
    allergens: ['gluten', 'dairy', 'eggs'],
    featured: true,
  },
  {
    name: 'Forest Fruit Waffle',
    slug: 'forest-fruit-waffle',
    category: 'waffles',
    price: 4.2,
    description: 'Golden waffle topped with mixed berries and whipped cream.',
    allergens: ['gluten', 'dairy'],
  },
  {
    name: 'Classic Cocoa Waffle',
    slug: 'classic-cocoa-waffle',
    category: 'waffles',
    price: 3.5,
    description: 'Traditional cocoa-dusted waffle served with fresh berries.',
    allergens: ['gluten', 'dairy'],
  },

  // Pancakes
  {
    name: 'Caramelized Peak',
    slug: 'caramelized-peak',
    category: 'pancakes',
    price: 4.7,
    description:
      'Tall stack of fluffy pancakes dripping with golden caramel and crushed hazelnuts.',
    ingredients: 'Buttermilk pancakes, salted caramel, roasted hazelnuts, butter',
    allergens: ['gluten', 'dairy', 'eggs', 'nuts'],
    featured: true,
  },
  {
    name: 'Berry Bliss Pancakes',
    slug: 'berry-bliss-pancakes',
    category: 'pancakes',
    price: 4.5,
    description: 'Soft pancake stack with mixed berry compote.',
    allergens: ['gluten', 'dairy', 'eggs'],
  },
  {
    name: 'Choco Chip Stack',
    slug: 'choco-chip-stack',
    category: 'pancakes',
    price: 4.3,
    description: 'Buttermilk pancakes studded with dark chocolate chips.',
    allergens: ['gluten', 'dairy', 'eggs'],
  },

  // Crêpes
  {
    name: 'Hazelnut Lace Crêpe',
    slug: 'hazelnut-lace-crepe',
    category: 'crepes',
    price: 3.8,
    description: 'Delicate crêpe folded around hazelnut chocolate spread.',
    allergens: ['gluten', 'dairy', 'nuts'],
    featured: true,
  },
  {
    name: 'Banana Nutella Crêpe',
    slug: 'banana-nutella-crepe',
    category: 'crepes',
    price: 3.9,
    description: 'Warm crêpe with banana slices and hazelnut chocolate.',
    allergens: ['gluten', 'dairy', 'nuts'],
  },
  {
    name: 'Strawberry Cream Crêpe',
    slug: 'strawberry-cream-crepe',
    category: 'crepes',
    price: 3.7,
    description: 'Light crêpe with fresh strawberries and whipped cream.',
    allergens: ['gluten', 'dairy'],
  },

  // Cold Drinks
  {
    name: 'Caramel Frappé',
    slug: 'caramel-frappe',
    category: 'cold-drinks',
    price: 3.5,
    description: 'Iced blended coffee with a caramel swirl.',
    allergens: ['dairy'],
    featured: true,
  },
  {
    name: 'Iced Mocha',
    slug: 'iced-mocha',
    category: 'cold-drinks',
    price: 3.3,
    description: 'Espresso, chocolate and cold milk over ice.',
    allergens: ['dairy'],
  },
  {
    name: 'Cold Brew',
    slug: 'cold-brew',
    category: 'cold-drinks',
    price: 2.9,
    description: 'Slow-steeped, smooth cold brew coffee.',
    allergens: [],
  },
];

async function seed() {
  await connectDB();

  await Category.deleteMany({});
  await Category.insertMany(categories);
  console.log(`Seeded ${categories.length} categories`);

  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products`);

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@chocoworld.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
  const adminName = process.env.ADMIN_NAME || 'Admin';

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });
    console.log(`Created admin user: ${adminEmail} / ${adminPassword}`);
  } else {
    console.log('Admin user already exists, skipping creation.');
  }

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});