import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MenuItem from './models/MenuItem.js';
import User from './models/User.js';

dotenv.config();

const sampleMenuItems = [
  // 1. Signature Roasts
  {
    name: 'Midnight Obsidian Ristretto',
    category: 'Signature Roasts',
    price: 8.00,
    description: 'Concentrated double ristretto pulled under 9-bar pressure from washed Ethiopian heirloom beans, boasting notes of 90% dark cocoa, wild bergamot citrus, and smoked cedarwood.',
    flavorNotes: ['Dark Cocoa', 'Wild Bergamot', 'Smoked Cedar'],
    origin: 'Sidama Micro-Lot • Ethiopia (2,100m)',
    calories: 10,
    image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=800&auto=format&fit=crop',
    isChefSpecial: true,
  },
  {
    name: 'Caramelized Maple Cortado',
    category: 'Signature Roasts',
    price: 9.50,
    description: 'Equal parts rich espresso and silky micro-foamed oat milk, infused with barrel-aged Vermont maple reduction, crushed star anise, and smoked sea salt.',
    flavorNotes: ['Barrel-Aged Maple', 'Star Anise', 'Smoked Salt'],
    origin: 'Antioquia Highlands • Colombia (1,850m)',
    calories: 90,
    image: 'https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?q=80&w=800&auto=format&fit=crop',
    isChefSpecial: false,
  },
  {
    name: 'Smoked Bourbon Flat White',
    category: 'Signature Roasts',
    price: 11.00,
    description: 'Smooth double espresso paired with micro-textured whole milk, steeped with Bourbon vanilla bean pod and crowned with charred cinnamon bark dust.',
    flavorNotes: ['Bourbon Vanilla', 'Brown Butter', 'Charred Cinnamon'],
    origin: 'Tarrazú Reserve • Costa Rica (1,750m)',
    calories: 130,
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=800&auto=format&fit=crop',
    isChefSpecial: true,
  },
  {
    name: 'Kashmiri Saffron Latte',
    category: 'Signature Roasts',
    price: 12.00,
    description: 'Single-origin espresso harmonized with micro-steamed oat milk, infused with real steeped Kashmiri saffron threads and raw mountain wildflower honey.',
    flavorNotes: ['Kashmiri Saffron', 'Wildflower Honey', 'Velvet Foam'],
    origin: 'Huila Micro-Lot • Colombia (1,920m)',
    calories: 135,
    image: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?q=80&w=800&auto=format&fit=crop',
    isChefSpecial: false,
  },

  // 2. Specialty Coffee
  {
    name: 'Highland Gesha Chemex',
    category: 'Specialty Coffee',
    price: 14.50,
    description: 'Rare anaerobic-fermented Gesha varietal hand-brewed table-side through copper Chemex carafes; fragrant notes of white jasmine, fresh nectarine, and wildflower honey.',
    flavorNotes: ['White Jasmine', 'Ripe Nectarine', 'Wild Honey'],
    origin: 'Boquete Valley • Panama (1,980m)',
    calories: 5,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop',
    isChefSpecial: true,
  },
  {
    name: 'Yirgacheffe Lavender V60',
    category: 'Specialty Coffee',
    price: 13.00,
    description: 'Single-origin slow pour through Japanese ceramic V60 drippers; bright floral bouquet of dried lavender, Meyer lemon, and wild apricot nectar.',
    flavorNotes: ['Dried Lavender', 'Meyer Lemon', 'Apricot Nectar'],
    origin: 'Guji Highland • Ethiopia (2,200m)',
    calories: 5,
    image: 'https://images.unsplash.com/photo-1495774856032-8b90bbb32b32?q=80&w=800&auto=format&fit=crop',
    isChefSpecial: false,
  },
  {
    name: 'Sumatra Mandheling Immersion Press',
    category: 'Specialty Coffee',
    price: 12.00,
    description: 'Heavy-bodied full-immersion French press extraction yielding a syrupy mouthfeel with notes of cedarwood, dark molasses, and pipe tobacco.',
    flavorNotes: ['Dark Molasses', 'Cedarwood', 'Bittersweet Cocoa'],
    origin: 'Lake Toba Highlands • Sumatra (1,650m)',
    calories: 5,
    image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=800&auto=format&fit=crop',
    isChefSpecial: false,
  },
  {
    name: 'Kenyan Peaberry Origami Drip',
    category: 'Specialty Coffee',
    price: 13.50,
    description: 'Rare round peaberry harvest brewed via folded paper in ceramic Origami cone; sparkling blackcurrant wine acidity and brown sugar sweetness.',
    flavorNotes: ['Blackcurrant', 'Spiced Wine', 'Caramel Cane'],
    origin: 'Nyeri Hill Estate • Kenya (2,050m)',
    calories: 5,
    image: 'https://images.unsplash.com/photo-1525088553748-01d6e210e00b?q=80&w=800&auto=format&fit=crop',
    isChefSpecial: false,
  },

  // 3. Cold Brews & Drinks
  {
    name: 'Kyoto 24-Hour Cold Drip',
    category: 'Cold Brews & Drinks',
    price: 11.50,
    description: 'Slow drip-by-drip cold extraction over 24 hours using handcrafted Japanese Kyoto glass towers, served over a hand-carved crystal ice sphere.',
    flavorNotes: ['Dark Molasses', 'Cedar Wood', 'Bittersweet Cocoa'],
    origin: 'Sumatra Mandheling • Indonesia (1,600m)',
    calories: 15,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=800&auto=format&fit=crop',
    isChefSpecial: true,
  },
  {
    name: 'Sparkling Yuzu Cascara Fizz',
    category: 'Cold Brews & Drinks',
    price: 10.50,
    description: 'Cold-steeped organic coffee cherry cascara tea blended with sparkling botanical tonic, fresh Japanese Yuzu citrus, and torched rosemary sprig.',
    flavorNotes: ['Japanese Yuzu', 'Cascara Berry', 'Torched Rosemary'],
    origin: 'Kochi Citrus & Tarrazú Blend',
    calories: 35,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop',
    isChefSpecial: false,
  },
  {
    name: 'Ceremonial Uji Matcha Cloud',
    category: 'Cold Brews & Drinks',
    price: 12.50,
    description: 'First-harvest stone-ground Uji ceremonial matcha hand-whisked over iced oat milk, topped with a velvety cold-aerated bourbon vanilla cloud.',
    flavorNotes: ['Sweet Bamboo', 'Ceremonial Umami', 'Whipped Vanilla'],
    origin: 'Kyoto Prefecture • Japan',
    calories: 90,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=800&auto=format&fit=crop',
    isChefSpecial: false,
  },
  {
    name: 'Nitro Stout Cold Draught',
    category: 'Cold Brews & Drinks',
    price: 12.00,
    description: 'Keg-conditioned cold brew charged with pure nitrogen gas, delivering a cascading stout-like head, silky micro-bubbles, and rich cocoa cream body.',
    flavorNotes: ['Velvet Cream', 'Dark Chocolate', 'Roasted Barley'],
    origin: 'Chiapas Organic Reserve • Mexico (1,650m)',
    calories: 20,
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=800&auto=format&fit=crop',
    isChefSpecial: true,
  },

  // 4. Fresh Bakery & Desserts
  {
    name: 'Valrhona Dark Ganache Tart',
    category: 'Fresh Bakery & Desserts',
    price: 14.00,
    description: 'Midnight black cocoa shortcrust shell filled with 70% Guanaja dark chocolate ganache, roasted Piedmont hazelnut praline, and dusted with 24k gold leaf.',
    flavorNotes: ['Grand Cru Chocolate', 'Salted Toffee', 'Roasted Hazelnut'],
    origin: 'Valrhona Grand Cru • France',
    calories: 360,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop',
    isChefSpecial: true,
  },
  {
    name: 'Artisanal Pistachio Pain au Chocolat',
    category: 'Fresh Bakery & Desserts',
    price: 13.50,
    description: '72-hour fermented French butter puff pastry filled with roasted Bronte pistachio cream and dual batons of bittersweet dark chocolate, topped with flaked almonds.',
    flavorNotes: ['Bronte Pistachio', 'Bittersweet Chocolate', 'Flaky Butter'],
    origin: "L'Atelier Viennoiserie • Bordeaux",
    calories: 390,
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=800&auto=format&fit=crop',
    isChefSpecial: false,
  },
  {
    name: 'Tahitian Vanilla Bean Canelé',
    category: 'Fresh Bakery & Desserts',
    price: 9.50,
    description: 'Traditional Bordeaux pastry baked in beeswax-lined copper molds for a caramelized obsidian shell and an aromatic, custardy interior.',
    flavorNotes: ['Tahitian Vanilla', 'Dark Caramelized Shell', 'Aged Rum'],
    origin: 'Bordeaux Tradition • France',
    calories: 210,
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?q=80&w=800&auto=format&fit=crop',
    isChefSpecial: false,
  },
];

const seedDatabase = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/moon_and_bean_db';
  try {
    console.log(`Connecting to MongoDB at: ${uri}`);
    await mongoose.connect(uri);
    console.log('✓ Connected to MongoDB');

    // 1. Seed or update Admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@moonandbean.com';
    const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'admin1234';
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      await User.create({
        name: 'Moon & Bean Administrator',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
      });
      console.log(`✓ Created default administrator: ${adminEmail} (Password: ${adminPassword})`);
    } else {
      admin.password = adminPassword;
      admin.role = 'admin';
      await admin.save();
      console.log(`✓ Administrator account refreshed: ${adminEmail}`);
    }

    // 2. Clear & Seed Menu Items
    await MenuItem.deleteMany({});
    await MenuItem.insertMany(sampleMenuItems);
    console.log(`✓ Seeded ${sampleMenuItems.length} Moon & Bean signature menu items!`);

    console.log('\n=============================================');
    console.log('  Database setup completed successfully! 🎉');
    console.log('=============================================\n');
    process.exit(0);
  } catch (error) {
    console.error('✕ Seeder Error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
