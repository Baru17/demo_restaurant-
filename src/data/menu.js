/**
 * Sample menu data for the PONNIYIN VIRUNDHU demo.
 * Replace names, descriptions, prices, and dietary tags with client-approved content.
 * Prices are in INR and formatted with `restaurant.currency` / `restaurant.locale`.
 */
export const MENU_CATEGORIES = [
  { id: 'tiffin', label: 'Tiffin', description: 'Dosa, idli & vada' },
  { id: 'starters', label: 'Starters', description: 'Small plates' },
  { id: 'mains', label: 'Mains', description: 'Chettinad-inspired' },
  { id: 'biryani', label: 'Biryani & Rice', description: 'Seeraga samba & rice' },
  { id: 'desserts', label: 'Sweet & Coffee', description: 'To finish' },
];

export const DIETARY_LABELS = {
  vegetarian: { short: 'V', label: 'Vegetarian' },
  vegan: { short: 'VG', label: 'Vegan' },
  'gluten-free': { short: 'GF', label: 'Gluten-free' },
  'contains-nuts': { short: 'N', label: 'Contains nuts' },
};

export const MENU_ITEMS = [
  // Tiffin
  {
    id: 'ghee-roast-dosa',
    category: 'tiffin',
    name: 'Ghee Roast Dosa',
    nameTamil: 'நெய் தோசை',
    description: 'Crisp dosa, ghee, potato masala, coconut chutney, and sambar.',
    price: 320,
    dietary: ['vegetarian'],
    image: {
      src: '/images/dish-dosa.webp',
      alt: 'A crisp golden dosa served on a banana leaf with chutneys and sambar.',
      position: 'center',
    },
  },
  {
    id: 'masala-dosa',
    category: 'tiffin',
    name: 'Masala Dosa',
    description: 'Golden dosa folded over spiced potato, with chutney and sambar.',
    price: 280,
    dietary: ['vegetarian'],
  },
  {
    id: 'idli-vada',
    category: 'tiffin',
    name: 'Idli & Medu Vada',
    description: 'Steamed idli, crisp medu vada, sambar, and coconut chutney.',
    price: 240,
    dietary: ['vegetarian'],
  },
  {
    id: 'onion-uttapam',
    category: 'tiffin',
    name: 'Onion Uttapam',
    description: 'Thick rice pancake with onion, green chilli, and coriander; chutneys.',
    price: 290,
    dietary: ['vegetarian'],
  },

  // Starters
  {
    id: 'chettinad-mushroom',
    category: 'starters',
    name: 'Chettinad Mushroom',
    description: 'Button mushrooms roasted with Chettinad masala and curry leaf.',
    price: 340,
    dietary: ['vegetarian', 'gluten-free'],
  },
  {
    id: 'chicken-65',
    category: 'starters',
    name: 'Chicken 65',
    description: 'Crisp chicken, curry leaf, red chilli, and yoghurt.',
    price: 420,
  },
  {
    id: 'prawn-pepper-fry',
    category: 'starters',
    name: 'Prawn Pepper Fry',
    description: 'Prawns tossed with black pepper, onion, and curry leaf.',
    price: 520,
  },
  {
    id: 'rasam',
    category: 'starters',
    name: 'Pepper Rasam',
    description: 'Peppery tomato rasam, curry leaf, and a spoon of ghee.',
    price: 180,
    dietary: ['vegetarian', 'gluten-free'],
  },

  // Mains
  {
    id: 'chettinad-chicken',
    category: 'mains',
    name: 'Chettinad Chicken',
    nameTamil: 'செட்டிநாடு கோழி',
    description: 'Chicken simmered with roasted spices, coconut, and curry leaf.',
    price: 520,
    image: {
      src: '/images/dish-chettinad.webp',
      alt: 'A rich Indian chicken curry in a black bowl, garnished with coriander, tomato, and lemon.',
      position: 'center',
    },
  },
  {
    id: 'meen-kuzhambu',
    category: 'mains',
    name: 'Meen Kuzhambu',
    description: 'Tamarind fish curry with shallots and sesame oil.',
    price: 580,
  },
  {
    id: 'chettinad-paneer',
    category: 'mains',
    name: 'Chettinad Paneer',
    description: 'Paneer, black pepper, onion, and curry leaf.',
    price: 420,
    dietary: ['vegetarian', 'gluten-free'],
  },
  {
    id: 'vegetable-kootu',
    category: 'mains',
    name: 'Vegetable Kootu',
    description: 'Seasonal vegetables, lentils, coconut, and cumin.',
    price: 320,
    dietary: ['vegetarian', 'gluten-free'],
  },

  // Biryani & Rice
  {
    id: 'salem-biryani',
    category: 'biryani',
    name: 'Salem Chicken Biryani',
    nameTamil: 'சேலம் பிரியாணி',
    description: 'Seeraga samba rice, chicken, fried onion, mint, and raita.',
    price: 480,
    dietary: ['gluten-free'],
    image: {
      src: '/images/dish-biryani.webp',
      alt: 'Chicken biryani garnished with mint on a dark plate.',
      position: 'center',
    },
  },
  {
    id: 'mutton-biryani',
    category: 'biryani',
    name: 'Mutton Biryani',
    description: 'Seeraga samba rice, slow-cooked mutton, mint, and raita.',
    price: 560,
    dietary: ['gluten-free'],
  },
  {
    id: 'vegetable-biryani',
    category: 'biryani',
    name: 'Vegetable Biryani',
    description: 'Seeraga samba rice, vegetables, fried onion, mint, and raita.',
    price: 380,
    dietary: ['vegetarian', 'gluten-free'],
  },
  {
    id: 'curd-rice',
    category: 'biryani',
    name: 'Curd Rice',
    description: 'Short-grain rice, yoghurt, pomegranate, and curry leaf.',
    price: 220,
    dietary: ['vegetarian', 'gluten-free'],
  },

  // Sweet & Coffee
  {
    id: 'semiya-payasam',
    category: 'desserts',
    name: 'Semiya Payasam',
    description: 'Vermicelli, milk, cardamom, cashew, and raisin.',
    price: 180,
    dietary: ['vegetarian', 'contains-nuts'],
  },
  {
    id: 'ada-pradhaman',
    category: 'desserts',
    name: 'Ada Pradhaman',
    description: 'Rice flakes, jaggery, coconut milk, ghee, and cashew.',
    price: 220,
    dietary: ['vegetarian', 'contains-nuts'],
  },
  {
    id: 'filter-coffee',
    category: 'desserts',
    name: 'Filter Coffee',
    nameTamil: 'பில்டர் காபி',
    description: 'Chicory coffee, hot milk, served in a traditional tumbler.',
    price: 120,
    dietary: ['vegetarian', 'gluten-free'],
    image: {
      src: '/images/dish-filter-coffee.webp',
      alt: 'South Indian filter coffee served in traditional steel tumblers.',
      position: 'center',
    },
  },
  {
    id: 'masala-tea',
    category: 'desserts',
    name: 'Masala Tea',
    description: 'Assam tea with ginger, cardamom, and milk.',
    price: 100,
    dietary: ['vegetarian', 'gluten-free'],
  },
];
