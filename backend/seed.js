import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './db.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Category from './models/categoryModel.js';

dotenv.config();

const categories = [
  { label: 'Waffles', slug: 'waffles', tagline: 'Golden, warm, irresistible', displayOrder: 1 },
  { label: 'Pancakes', slug: 'pancakes', tagline: 'Fluffy stacks of joy', displayOrder: 2 },
  { label: 'Crepes', slug: 'crepes', tagline: 'Thin, soft, delicious', displayOrder: 3 },
  { label: 'Cold Drinks', slug: 'cold-drinks', tagline: 'Iced & refreshing', displayOrder: 4 },
  { label: 'Breakfast', slug: 'breakfast', tagline: 'Fresh starts, sweet mornings', displayOrder: 5 },
  { label: 'Churros', slug: 'churros', tagline: 'Crispy, sweet perfection', displayOrder: 6 },
  { label: 'Cookie Pan', slug: 'cookie-pan', tagline: 'Warm, gooey, homemade', displayOrder: 7 },
  { label: 'Fruit Cups', slug: 'fruit-cups', tagline: 'Fresh and refreshing bites', displayOrder: 8 },
  { label: 'Brownie', slug: 'brownie', tagline: 'Rich chocolate moments', displayOrder: 9 },
  { label: 'Cakes', slug: 'cakes', tagline: 'Sweet slices of happiness', displayOrder: 10 },
  { label: 'Other', slug: 'other', tagline: 'More sweet surprises', displayOrder: 11 },
];

const products = [
  // Waffles
  {
    name: 'Velvet Belgian Waffle',
    slug: 'velvet-belgian-waffle',
    category: 'waffles',
    price: 4.5,
    ingredients: 'Belgian waffle batter, dark chocolate, butter',
    allergens: ['gluten', 'dairy', 'eggs'],
    featured: true,
    displayOrder: 1,
  },
  {
    name: 'Forest Fruit Waffle',
    slug: 'forest-fruit-waffle',
    category: 'waffles',
    price: 4.2,
    allergens: ['gluten', 'dairy'],
    displayOrder: 2,
  },
  {
    name: 'Classic Cocoa Waffle',
    slug: 'classic-cocoa-waffle',
    category: 'waffles',
    price: 3.5,
    allergens: ['gluten', 'dairy'],
    displayOrder: 3,
  },

  // Pancakes
  {
    name: 'Caramelized Peak',
    slug: 'caramelized-peak',
    category: 'pancakes',
    price: 4.7,
    ingredients: 'Buttermilk pancakes, salted caramel, roasted hazelnuts, butter',
    allergens: ['gluten', 'dairy', 'eggs', 'nuts'],
    featured: true,
    displayOrder: 1,
  },
  {
    name: 'Berry Bliss Pancakes',
    slug: 'berry-bliss-pancakes',
    category: 'pancakes',
    price: 4.5,
    allergens: ['gluten', 'dairy', 'eggs'],
    displayOrder: 2,
  },
  {
    name: 'Choco Chip Stack',
    slug: 'choco-chip-stack',
    category: 'pancakes',
    price: 4.3,
    allergens: ['gluten', 'dairy', 'eggs'],
    displayOrder: 3,
  },

  // Crêpes
  {
    name: 'Hazelnut Lace Crêpe',
    slug: 'hazelnut-lace-crepe',
    category: 'crepes',
    price: 3.8,
    allergens: ['gluten', 'dairy', 'nuts'],
    featured: true,
    displayOrder: 1,
  },
  {
    name: 'Banana Nutella Crêpe',
    slug: 'banana-nutella-crepe',
    category: 'crepes',
    price: 3.9,
    allergens: ['gluten', 'dairy', 'nuts'],
    displayOrder: 2,
  },
  {
    name: 'Strawberry Cream Crêpe',
    slug: 'strawberry-cream-crepe',
    category: 'crepes',
    price: 3.7,
    allergens: ['gluten', 'dairy'],
    displayOrder: 3,
  },

  // Cold Drinks
  {
    name: 'Caramel Frappé',
    slug: 'caramel-frappe',
    category: 'cold-drinks',
    price: 3.5,
    allergens: ['dairy'],
    featured: true,
    displayOrder: 1,
  },
  {
    name: 'Iced Mocha',
    slug: 'iced-mocha',
    category: 'cold-drinks',
    price: 3.3,
    allergens: ['dairy'],
    displayOrder: 2,
  },
  {
    name: 'Cold Brew',
    slug: 'cold-brew',
    category: 'cold-drinks',
    price: 2.9,
    allergens: [],
    displayOrder: 3,
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
      isAdmin: true,
    });
    console.log(`Created admin user: ${adminEmail} / ${adminPassword}`);
  } else {
    if (!existingAdmin.isAdmin) {
      existingAdmin.isAdmin = true;
      await existingAdmin.save();
      console.log('Updated existing user to be admin.');
    }
    console.log('Admin user already exists.');
  }

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});