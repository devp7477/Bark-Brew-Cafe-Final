export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
  bestseller?: boolean;
  brand?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export const categories: Category[] = [
  { id: "all", name: "All Products", description: "Browse all pet products" },
  { id: "food", name: "Pet Food", description: "Dry & Wet food for dogs and cats" },
  { id: "treats", name: "Pet Treats", description: "Biscuits, Chews, and safe chocolates" },
  { id: "medicine", name: "Pet Medicines & Health Care", description: "Supplements, dewormers, and health care" },
  { id: "clothing", name: "Pet Clothing", description: "Hoodies, shirts, and winter wear" },
  { id: "accessories", name: "Pet Accessories", description: "Collars, leashes, bowls, and beds" },
  { id: "grooming", name: "Pet Grooming Essentials", description: "Shampoos, brushes, and grooming tools" }
];

export const products: Product[] = [
  // Pet Food (Dry & Wet)
  {
    id: 1,
    name: "Pedigree Adult Dry Dog Food",
    description: "Complete nutrition for adult dogs (3kg)",
    price: 650,
    image: "/images/Pedigree Adult Dry Dog Food.jpg",
    category: "food",
    rating: 4.5,
    inStock: true,
    bestseller: true,
    brand: "Pedigree"
  },
  {
    id: 2,
    name: "Royal Canin Medium Puppy Food",
    description: "Specially formulated for medium breed puppies (4kg)",
    price: 1200,
    image: "/images/Royal Canin Maxi puppy food.jpg",
    category: "food",
    rating: 4.7,
    inStock: true,
    brand: "Royal Canin"
  },
  {
    id: 3,
    name: "Drools Chicken and Egg Adult Dog Food",
    description: "High protein dry food for adult dogs (2.5kg)",
    price: 580,
    image: "/images/drools-dog-food.jpg",
    category: "food",
    rating: 4.6,
    inStock: true,
    bestseller: true,
    brand: "Drools"
  },
  {
    id: 4,
    name: "Farmina N&D Low Grain Dry Dog Food",
    description: "Grain-free premium dog food (2kg)",
    price: 1800,
    image: "/images/Merrick Grain-Free Dry Dog Food.jpg",
    category: "food",
    rating: 4.8,
    inStock: true,
    brand: "Farmina"
  },
  {
    id: 5,
    name: "Purina Supercoat Smartblend",
    description: "Balanced nutrition for all life stages (3.5kg)",
    price: 750,
    image: "/images/Purina Pro Plan Dog Food.jpg",
    category: "food",
    rating: 4.4,
    inStock: true,
    brand: "Purina"
  },
  {
    id: 6,
    name: "IAMS Proactive Health Puppy Food",
    description: "Complete nutrition for growing puppies (2kg)",
    price: 950,
    image: "/images/Iams Proactive Health.jpg",
    category: "food",
    rating: 4.6,
    inStock: true,
    brand: "IAMS"
  },
  {
    id: 7,
    name: "Hill's Science Diet Adult Dog Food",
    description: "Veterinarian recommended adult dog food (3kg)",
    price: 1400,
    image: "/images/Hills Science Diet Adult Dog Food.jpg",
    category: "food",
    rating: 4.7,
    inStock: true,
    brand: "Hill's"
  },
  {
    id: 8,
    name: "Pedigree Wet Dog Food Gravy Pack",
    description: "Tasty wet food with gravy (400g x 6 packs)",
    price: 320,
    image: "/images/Pedigree Adult Dry Dog Food.jpg",
    category: "food",
    rating: 4.3,
    inStock: true,
    brand: "Pedigree"
  },
  {
    id: 9,
    name: "Royal Canin Mini Adult Dry Dog Food",
    description: "Perfect for small breed adult dogs (1.5kg)",
    price: 850,
    image: "/images/Royal Canin Maxi puppy food.jpg",
    category: "food",
    rating: 4.6,
    inStock: true,
    brand: "Royal Canin"
  },
  {
    id: 10,
    name: "Canidae All Life Stages Dry Dog Food",
    description: "Suitable for dogs of all ages (2.5kg)",
    price: 1100,
    image: "/images/Canidae All Life Stages.jpg",
    category: "food",
    rating: 4.5,
    inStock: true,
    brand: "Canidae"
  },
  {
    id: 11,
    name: "Orijen Original Dry Dog Food",
    description: "Biologically appropriate premium dog food (2kg)",
    price: 2200,
    image: "/images/Orijen Original Dry Dog Food.jpg",
    category: "food",
    rating: 4.9,
    inStock: true,
    brand: "Orijen"
  },
  {
    id: 12,
    name: "Acana Classics Red Meat Recipe",
    description: "High-quality protein from red meats (2kg)",
    price: 1900,
    image: "/images/Acana Singles Dog Food.jpg",
    category: "food",
    rating: 4.7,
    inStock: true,
    brand: "Acana"
  },

  // Pet Treats
  {
    id: 13,
    name: "Pedigree Dentastix Dog Treats",
    description: "Dental care treats for dogs (28 pieces)",
    price: 180,
    image: "/images/Pedigree Dentastix.jpg",
    category: "treats",
    rating: 4.4,
    inStock: true,
    bestseller: true,
    brand: "Pedigree"
  },
  {
    id: 14,
    name: "Choostix Dog Treats",
    description: "Delicious chewable treats for dogs (100g)",
    price: 120,
    image: "/images/True Chews Premium Jerky Cuts.jpg",
    category: "treats",
    rating: 4.3,
    inStock: true,
    brand: "Choostix"
  },
  {
    id: 15,
    name: "Dogsee Chew Bars",
    description: "Natural chew bars for dental health (6 pieces)",
    price: 250,
    image: "/images/Old Mother Hubbard Crunchy Classics.jpg",
    category: "treats",
    rating: 4.5,
    inStock: true,
    brand: "Dogsee"
  },
  {
    id: 16,
    name: "JerHigh Chicken Stix",
    description: "High-protein chicken treats (150g)",
    price: 200,
    image: "/images/Pup-Peroni Dog Snacks.jpg",
    category: "treats",
    rating: 4.2,
    inStock: true,
    brand: "JerHigh"
  },
  {
    id: 17,
    name: "Drools Dog Chew Treats",
    description: "Long-lasting chew treats (200g)",
    price: 160,
    image: "/images/Merrick Power Bites.jpg",
    category: "treats",
    rating: 4.4,
    inStock: true,
    brand: "Drools"
  },
  {
    id: 18,
    name: "Purina Beggin' Strips",
    description: "Bacon-flavored training treats (150g)",
    price: 140,
    image: "/images/Rachael Ray Nutrish Soup Bones.jpg",
    category: "treats",
    rating: 4.3,
    inStock: true,
    brand: "Purina"
  },
  {
    id: 19,
    name: "Himalaya Healthy Treats",
    description: "Natural and healthy dog treats (100g)",
    price: 110,
    image: "/images/Nudges Natural Dog Treats.jpg",
    category: "treats",
    rating: 4.1,
    inStock: true,
    brand: "Himalaya"
  },
  {
    id: 20,
    name: "Pedigree Rodeo Dog Treats",
    description: "Fun-shaped treats for dogs (120g)",
    price: 130,
    image: "/images/Pedigree Dentastix.jpg",
    category: "treats",
    rating: 4.2,
    inStock: true,
    brand: "Pedigree"
  },
  {
    id: 21,
    name: "Temptations Cat Treats",
    description: "Irresistible treats for cats (60g)",
    price: 90,
    image: "/images/Wellness Soft Puppy Bites.jpg",
    category: "treats",
    rating: 4.6,
    inStock: true,
    brand: "Temptations"
  },
  {
    id: 22,
    name: "SmartBones Rawhide-Free Chews",
    description: "Safe alternative to rawhide (4 pieces)",
    price: 300,
    image: "/images/Greenies Dental Dog Treats.jpg",
    category: "treats",
    rating: 4.5,
    inStock: true,
    brand: "SmartBones"
  },
  {
    id: 23,
    name: "Milk-Bone Dog Biscuits",
    description: "Classic dog biscuits (1kg)",
    price: 220,
    image: "/images/Milk-Bone Original Dog Treats.jpg",
    category: "treats",
    rating: 4.4,
    inStock: true,
    brand: "Milk-Bone"
  },
  {
    id: 24,
    name: "Goodies Energy Treats",
    description: "High-energy treats for active dogs (150g)",
    price: 170,
    image: "/images/Blue Buffalo Wilderness Trail Treats.webp",
    category: "treats",
    rating: 4.3,
    inStock: true,
    brand: "Goodies"
  },

  // Pet Medicines & Health Care
  {
    id: 25,
    name: "Himalaya Liv.52 Pet Syrup",
    description: "Liver support syrup for pets (200ml)",
    price: 180,
    image: "/images/FortiFlora Probiotic Supplement.webp",
    category: "medicine",
    rating: 4.5,
    inStock: true,
    brand: "Himalaya"
  },
  {
    id: 26,
    name: "Virbac Canitone Joint Supplement",
    description: "Joint health supplement for dogs (60 tablets)",
    price: 450,
    image: "/images/Bravecto Chews.jpg",
    category: "medicine",
    rating: 4.6,
    inStock: true,
    brand: "Virbac"
  },
  {
    id: 27,
    name: "Bayer Drontal Plus Dewormer Tablets",
    description: "Broad-spectrum dewormer for dogs (6 tablets)",
    price: 320,
    image: "/images/Sentry WormX Plus.jpg",
    category: "medicine",
    rating: 4.7,
    inStock: true,
    brand: "Bayer"
  },
  {
    id: 28,
    name: "Savavet Kiwof Deworming Tablet",
    description: "Effective deworming tablets for pets (10 tablets)",
    price: 150,
    image: "/images/Sentry WormX Plus.jpg",
    category: "medicine",
    rating: 4.3,
    inStock: true,
    brand: "Savavet"
  },
  {
    id: 29,
    name: "Beaphar Multi-Vitamin Paste",
    description: "Complete vitamin supplement paste (100g)",
    price: 280,
    image: "/images/FortiFlora Probiotic Supplement.webp",
    category: "medicine",
    rating: 4.4,
    inStock: true,
    brand: "Beaphar"
  },
  {
    id: 30,
    name: "Petcare Nutricoat Advance Supplement",
    description: "Coat and skin health supplement (200ml)",
    price: 350,
    image: "/images/Blue Buffalo Life Protection.webp",
    category: "medicine",
    rating: 4.5,
    inStock: true,
    brand: "Petcare"
  },
  {
    id: 31,
    name: "Frontline Plus Flea & Tick Treatment",
    description: "Spot-on flea and tick prevention (3 doses)",
    price: 650,
    image: "/images/Frontline Plus Flea & Tick Treatment.jpg",
    category: "medicine",
    rating: 4.6,
    inStock: true,
    brand: "Frontline"
  },
  {
    id: 32,
    name: "Simparica Chewable Tablet",
    description: "Monthly tick prevention chewable (3 tablets)",
    price: 850,
    image: "/images/NexGard Chewables.jpg",
    category: "medicine",
    rating: 4.7,
    inStock: true,
    brand: "Simparica"
  },
  {
    id: 33,
    name: "Bayer Advocate Spot-On",
    description: "Broad-spectrum parasite protection (3 doses)",
    price: 720,
    image: "/images/Advantage II Topical Treatment.jpg",
    category: "medicine",
    rating: 4.5,
    inStock: true,
    brand: "Bayer"
  },
  {
    id: 34,
    name: "Himalaya Digyton Drops",
    description: "Digestive support drops for pets (30ml)",
    price: 120,
    image: "/images/Zymox Ear Solution.jpg",
    category: "medicine",
    rating: 4.2,
    inStock: true,
    brand: "Himalaya"
  },
  {
    id: 35,
    name: "Petcare Proviboost Syrup",
    description: "Immune system booster syrup (200ml)",
    price: 250,
    image: "/images/FortiFlora Probiotic Supplement.webp",
    category: "medicine",
    rating: 4.3,
    inStock: true,
    brand: "Petcare"
  },
  {
    id: 36,
    name: "Vetoquinol Nutri-Coat Advance",
    description: "Advanced coat conditioning supplement (60 tablets)",
    price: 420,
    image: "/images/Blue Buffalo Life Protection.webp",
    category: "medicine",
    rating: 4.4,
    inStock: true,
    brand: "Vetoquinol"
  },

  // Pet Clothing
  {
    id: 37,
    name: "Goofy Tails Dog Hoodie",
    description: "Comfortable cotton hoodie for dogs (Size M)",
    price: 450,
    image: "/images/Dog Hoodie Casual Wear.jpg",
    category: "clothing",
    rating: 4.5,
    inStock: true,
    brand: "Goofy Tails"
  },
  {
    id: 38,
    name: "Mutt Of Course Printed Dog T-Shirt",
    description: "Fun printed cotton t-shirt for dogs (Size L)",
    price: 320,
    image: "/images/Dog T-Shirt Cotton.jpg",
    category: "clothing",
    rating: 4.3,
    inStock: true,
    brand: "Mutt Of Course"
  },
  {
    id: 39,
    name: "Pawzone Winter Sweater for Dogs",
    description: "Warm winter sweater for cold weather (Size S)",
    price: 380,
    image: "/images/Dog Sweater Knitwear.jpg",
    category: "clothing",
    rating: 4.4,
    inStock: true,
    brand: "Pawzone"
  },
  {
    id: 40,
    name: "Petsnugs Cotton Dog Shirt",
    description: "Soft cotton shirt for everyday wear (Size M)",
    price: 280,
    image: "/images/Dog T-Shirt Cotton.jpg",
    category: "clothing",
    rating: 4.2,
    inStock: true,
    brand: "Petsnugs"
  },
  {
    id: 41,
    name: "Pupkart Dog Raincoat",
    description: "Waterproof raincoat for dogs (Size L)",
    price: 520,
    image: "/images/Dog Raincoat Waterproof Jacket.jpg",
    category: "clothing",
    rating: 4.6,
    inStock: true,
    brand: "Pupkart"
  },
  {
    id: 42,
    name: "Urban Pup Dog Jacket",
    description: "Stylish denim jacket for dogs (Size M)",
    price: 480,
    image: "/images/Dog Winter Coat.jpg",
    category: "clothing",
    rating: 4.4,
    inStock: true,
    brand: "Urban Pup"
  },
  {
    id: 43,
    name: "Pet Life Reflective Dog Coat",
    description: "Safety reflective coat for night walks (Size L)",
    price: 350,
    image: "/images/Reflective Dog Vest.jpg",
    category: "clothing",
    rating: 4.5,
    inStock: true,
    brand: "Pet Life"
  },
  {
    id: 44,
    name: "Puppia Soft Harness Vest",
    description: "Comfortable harness vest for dogs (Size M)",
    price: 420,
    image: "/images/Dog Cooling Vest.jpg",
    category: "clothing",
    rating: 4.6,
    inStock: true,
    brand: "Puppia"
  },
  {
    id: 45,
    name: "AmazonBasics Dog Jacket",
    description: "Basic fleece jacket for dogs (Size S)",
    price: 250,
    image: "/images/Dog Winter Coat.jpg",
    category: "clothing",
    rating: 4.1,
    inStock: true,
    brand: "AmazonBasics"
  },
  {
    id: 46,
    name: "MuttNation Denim Vest",
    description: "Stylish denim vest for dogs (Size L)",
    price: 380,
    image: "/images/Dog Bandana Collar.jpg",
    category: "clothing",
    rating: 4.3,
    inStock: true,
    brand: "MuttNation"
  },
  {
    id: 47,
    name: "Goofy Tails Dog Socks",
    description: "Non-slip socks for dogs (4 pairs)",
    price: 180,
    image: "/images/Dog Boots Waterproof.jpg",
    category: "clothing",
    rating: 4.2,
    inStock: true,
    brand: "Goofy Tails"
  },
  {
    id: 48,
    name: "Petsnugs Party Dress for Dogs",
    description: "Elegant party dress for special occasions (Size M)",
    price: 550,
    image: "/images/Dog Birthday Outfit.jpg",
    category: "clothing",
    rating: 4.7,
    inStock: true,
    brand: "Petsnugs"
  },

  // Pet Accessories
  {
    id: 49,
    name: "PetsPot Nylon Collar",
    description: "Durable nylon collar with buckle (Adjustable)",
    price: 120,
    image: "/images/Adjustable Nylon Collar.jpg",
    category: "accessories",
    rating: 4.3,
    inStock: true,
    brand: "PetsPot"
  },
  {
    id: 50,
    name: "Flexi Retractable Dog Leash",
    description: "Retractable leash with comfortable handle (5m)",
    price: 450,
    image: "/images/Retractable Dog Leash.jpg",
    category: "accessories",
    rating: 4.6,
    inStock: true,
    brand: "Flexi"
  },
  {
    id: 51,
    name: "Outward Hound Slow Feeder Bowl",
    description: "Slow feeding bowl to prevent overeating",
    price: 280,
    image: "/images/Slow Feeder Dog Bowl.jpg",
    category: "accessories",
    rating: 4.5,
    inStock: true,
    brand: "Outward Hound"
  },
  {
    id: 52,
    name: "KONG Classic Chew Toy",
    description: "Durable rubber chew toy for dogs",
    price: 350,
    image: "/images/dog-chew-toy.jpg",
    category: "accessories",
    rating: 4.7,
    inStock: true,
    bestseller: true,
    brand: "KONG"
  },
  {
    id: 53,
    name: "Ruffwear Dog Harness",
    description: "Comfortable walking harness for dogs (Size M)",
    price: 650,
    image: "/images/Heavy-Duty Dog Harness.jpg",
    category: "accessories",
    rating: 4.8,
    inStock: true,
    brand: "Ruffwear"
  },
  {
    id: 54,
    name: "Goofy Tails Stainless Steel Bowl",
    description: "Durable stainless steel food bowl (Medium)",
    price: 180,
    image: "/images/Slow Feeder Dog Bowl.jpg",
    category: "accessories",
    rating: 4.4,
    inStock: true,
    brand: "Goofy Tails"
  },
  {
    id: 55,
    name: "AmazonBasics Dog Bed",
    description: "Comfortable orthopedic dog bed (Medium)",
    price: 850,
    image: "/images/Car Seat Cover for Dogs.jpg",
    category: "accessories",
    rating: 4.5,
    inStock: true,
    brand: "AmazonBasics"
  },
  {
    id: 56,
    name: "FurryTail Pet Carrier Bag",
    description: "Portable pet carrier bag with mesh windows",
    price: 1200,
    image: "/images/Dog Travel Carrier Bag.jpg",
    category: "accessories",
    rating: 4.6,
    inStock: true,
    brand: "FurryTail"
  },
  {
    id: 57,
    name: "Trixie Dog Ball Toy",
    description: "Interactive ball toy for dogs",
    price: 150,
    image: "/images/catnip-ball.jpg",
    category: "accessories",
    rating: 4.2,
    inStock: true,
    brand: "Trixie"
  },
  {
    id: 58,
    name: "Chuckit! Ultra Ball",
    description: "High-bouncing ball for fetch games",
    price: 200,
    image: "/images/catnip-ball.jpg",
    category: "accessories",
    rating: 4.7,
    inStock: true,
    brand: "Chuckit!"
  },
  {
    id: 59,
    name: "FurHaven Pet Sofa Bed",
    description: "Luxurious sofa-style pet bed (Large)",
    price: 1500,
    image: "/images/Car Seat Cover for Dogs.jpg",
    category: "accessories",
    rating: 4.8,
    inStock: true,
    brand: "FurHaven"
  },
  {
    id: 60,
    name: "PetSafe Drinkwell Pet Fountain",
    description: "Automatic water fountain for pets",
    price: 2200,
    image: "/images/Portable Water Bottle for Dogs.jpg",
    category: "accessories",
    rating: 4.6,
    inStock: true,
    brand: "PetSafe"
  },

  // Pet Grooming Essentials
  {
    id: 61,
    name: "Himalaya Erina-EP Tick & Flea Shampoo",
    description: "Natural tick and flea control shampoo (200ml)",
    price: 180,
    image: "/images/Dog Shampoo Oatmeal Formula.webp",
    category: "grooming",
    rating: 4.4,
    inStock: true,
    brand: "Himalaya"
  },
  {
    id: 62,
    name: "Captain Zack Conditioning Shampoo",
    description: "Moisturizing conditioning shampoo (250ml)",
    price: 220,
    image: "/images/Dog Conditioner Coat Care.jpg",
    category: "grooming",
    rating: 4.5,
    inStock: true,
    brand: "Captain Zack"
  },
  {
    id: 63,
    name: "Wahl Dog Shampoo Oatmeal Formula",
    description: "Gentle oatmeal formula for sensitive skin (250ml)",
    price: 280,
    image: "/images/Dog Shampoo Oatmeal Formula.webp",
    category: "grooming",
    rating: 4.6,
    inStock: true,
    brand: "Wahl"
  },
  {
    id: 64,
    name: "Pet Head Dry Clean Spray",
    description: "Dry cleaning spray between baths (200ml)",
    price: 150,
    image: "/images/Dog Conditioner Coat Care.jpg",
    category: "grooming",
    rating: 4.3,
    inStock: true,
    brand: "Pet Head"
  },
  {
    id: 65,
    name: "Furminator Deshedding Brush",
    description: "Professional deshedding brush for dogs",
    price: 850,
    image: "/images/Deshedding Tool.jpg",
    category: "grooming",
    rating: 4.8,
    inStock: true,
    bestseller: true,
    brand: "Furminator"
  },
  {
    id: 66,
    name: "Trixie Slicker Brush",
    description: "Gentle slicker brush for all coat types",
    price: 120,
    image: "/images/Slicker Brush for Dogs.jpg",
    category: "grooming",
    rating: 4.4,
    inStock: true,
    brand: "Trixie"
  },
  {
    id: 67,
    name: "Wahl Pet Clipper Kit",
    description: "Complete pet grooming clipper kit",
    price: 1200,
    image: "/images/Dog Grooming Clippers.jpg",
    category: "grooming",
    rating: 4.7,
    inStock: true,
    brand: "Wahl"
  },
  {
    id: 68,
    name: "Goofy Tails Pet Nail Clipper",
    description: "Safe nail clipper with safety guard",
    price: 180,
    image: "/images/Nail Clippers with Safety Guard.webp",
    category: "grooming",
    rating: 4.5,
    inStock: true,
    brand: "Goofy Tails"
  },
  {
    id: 69,
    name: "Ruffwear Microfiber Towel",
    description: "Quick-dry microfiber towel for pets",
    price: 250,
    image: "/images/Grooming Gloves for Shedding.jpg",
    category: "grooming",
    rating: 4.6,
    inStock: true,
    brand: "Ruffwear"
  },
  {
    id: 70,
    name: "Beaphar Ear Cleaner",
    description: "Gentle ear cleaning solution (100ml)",
    price: 120,
    image: "/images/Zymox Ear Solution.jpg",
    category: "grooming",
    rating: 4.4,
    inStock: true,
    brand: "Beaphar"
  },
  {
    id: 71,
    name: "Petkin Dog Wipes",
    description: "Hypoallergenic cleaning wipes (50 pieces)",
    price: 200,
    image: "/images/Grooming Gloves for Shedding.jpg",
    category: "grooming",
    rating: 4.3,
    inStock: true,
    brand: "Petkin"
  },
  {
    id: 72,
    name: "Burt's Bees Detangling Spray",
    description: "Natural detangling spray for pets (150ml)",
    price: 180,
    image: "/images/Dog Conditioner Coat Care.jpg",
    category: "grooming",
    rating: 4.5,
    inStock: true,
    brand: "Burt's Bees"
  }
];
