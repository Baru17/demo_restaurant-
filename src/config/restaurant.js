/**
 * Central restaurant configuration.
 *
 * This is the first file to edit when adapting the demo for a new client.
 * Menu items live in `src/data/menu.js`, gallery photos in `src/data/gallery.js`,
 * and visual tokens in `src/index.css` (values below are applied at runtime).
 *
 * Tamil fields are optional. Every Tamil string is rendered with a `lang="ta"`
 * attribute and the dedicated Tamil font stack so screen readers and browsers
 * treat it as Tamil rather than English.
 */
const restaurant = {
  name: 'PONNIYIN VIRUNDHU',
  nameTamil: 'பொன்னியின் விருந்து',
  tagline: 'A Taste of Tamil Tradition',
  taglineTamil: 'தமிழ் மரபின் சுவை',
  brandDescriptor: 'Tamil Kitchen',
  shortDescription:
    'A Tamil kitchen in Salem serving dosa, Chettinad-inspired dishes, biryani, and filter coffee in a warm, elegant dining room.',
  cuisine: 'Tamil, South Indian',
  priceRange: '₹₹',
  currency: 'INR',
  locale: 'en-IN',
  language: 'en-IN',

  demo: {
    enabled: true,
    label: 'Website demo',
    disclaimer:
      'PONNIYIN VIRUNDHU is a fictional restaurant created for this website demonstration. The menu, hours, phone number, email, location, and reservation flow are sample content. No bookings are taken.',
  },

  // Applied to CSS custom properties in App.jsx. Keep index.css fallbacks in sync.
  theme: {
    background: '#10100F',
    surface: '#191816',
    elevated: '#22201D',
    text: '#F5F0E8',
    muted: '#B5ADA0',
    accent: '#C7A56B',
    border: 'rgba(245, 240, 232, 0.14)',
  },

  nav: [
    { label: 'Home', href: '#home' },
    { label: 'Our Story', href: '#story' },
    { label: 'Menu', href: '#menu' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Visit Us', href: '#visit' },
  ],

  announcement: {
    enabled: true,
    text: 'A Tamil kitchen in Salem · Explore the sample menu.',
    link: { label: 'View the menu', href: '#menu' },
    dismissible: true,
  },

  hero: {
    eyebrow: 'Tamil Kitchen · Salem',
    headline: 'A Taste of',
    headlineAccent: 'Tamil Tradition.',
    tamilTagline: 'தமிழ் மரபின் சுவை',
    description:
      'Dosa crisp from the tawa, rice served with care, Chettinad-inspired spice, and filter coffee to finish. A warm Tamil table in the heart of Salem.',
    primaryCta: { label: 'Explore Our Menu', href: '#menu' },
    secondaryCta: { label: 'Plan Your Visit', href: '#visit' },
    image: {
      src: '/images/hero-tamil-feast.webp',
      alt: 'A traditional South Indian feast on a banana leaf with dosa, curries, and filter coffee.',
      position: 'center 55%',
    },
    details: [
      { label: 'Where', value: 'Salem, Tamil Nadu' },
      { label: 'Hours', value: 'Sample · Tue – Sun' },
    ],
    note: 'Sample hours and details — please confirm before visiting.',
  },

  philosophy: {
    id: 'philosophy',
    eyebrow: 'Our Philosophy',
    tamil: 'எங்கள் தத்துவம்',
    heading: 'Rooted in Tamil homes,',
    headingAccent: 'served with care.',
    body: 'Our cooking begins with the everyday Tamil kitchen: rice and lentils, curry leaves in hot oil, coconut, tamarind, and spice ground with patience. We keep the familiar flavours intact and let the dining room do the rest.',
    image: {
      src: '/images/tamil-breakfast.webp',
      alt: 'A South Indian breakfast of appam, curry, and chutney served on a banana leaf.',
      position: 'center',
      caption: 'Breakfast, served on banana leaf.',
    },
    points: [
      {
        title: 'Ground fresh',
        text: 'Masalas and chutneys are prepared in small batches with curry leaves, coconut, and whole spices.',
      },
      {
        title: 'Tawa & fire',
        text: 'Dosa and uttapam are made to order — crisp at the edges, soft at the centre.',
      },
      {
        title: 'A table for everyone',
        text: 'A warm room for family meals, quiet lunches, and long conversations over filter coffee.',
      },
    ],
  },

  signatureDishes: {
    eyebrow: 'From the Kitchen',
    tamil: 'சிறப்பு உணவுகள்',
    heading: 'Signature dishes,',
    headingAccent: 'Tamil soul.',
    description:
      'Four plates that best describe our table — a crisp dosa, Chettinad-inspired chicken, fragrant biryani, and filter coffee. Sample menu items.',
    dishIds: ['ghee-roast-dosa', 'chettinad-chicken', 'salem-biryani', 'filter-coffee'],
  },

  menu: {
    eyebrow: 'The Menu',
    tamil: 'உணவு பட்டியல்',
    heading: 'A Tamil table,',
    headingAccent: 'course by course.',
    description:
      'From tiffin and dosa to Chettinad-inspired mains, biryani, and filter coffee. Choose a category to explore the sample selection.',
    note: 'Sample menu. Dishes, prices, and availability are illustrative.',
    priceNote: 'Prices in INR (₹). Please tell your server about allergies before ordering.',
  },

  gallery: {
    eyebrow: 'Around the Table',
    tamil: 'படங்கள்',
    heading: 'Tamil food,',
    headingAccent: 'warm light.',
    description:
      'Dosa on banana leaf, idli and vada, payasam, and the dining room after dark. Select any image to view it larger.',
    note: "Photography via Pexels, used under the Pexels license. Images are illustrative and are not the restaurant's own photography.",
  },

  story: {
    id: 'story',
    eyebrow: 'Our Story',
    tamil: 'எங்கள் கதை',
    heading: 'A kitchen shaped by',
    headingAccent: 'Tamil tradition.',
    body: [
      'Our table is inspired by the Tamil home: a banana leaf laid out with rice, sambar, rasam, and vegetables; a tawa kept busy with dosa; and coffee poured strong at the end.',
      'We bring those familiar rhythms into a warm, unhurried dining room in Salem — a place for family meals, quiet lunches, and long conversations. The menu is a sample of that idea, written with respect for the dishes and the people who make them.',
    ],
    tamilQuote: 'வாங்க, சாப்பிடுங்க. கொஞ்சம் நேரம் இருங்க.',
    quote: 'Come, eat. Stay awhile.',
    attribution: 'The PONNIYIN VIRUNDHU table',
    image: {
      src: '/images/tamil-dining-room.webp',
      alt: 'An ornate Indian dining room with carved arches, warm lighting, and elegantly set tables.',
      position: 'center',
      caption: 'Warm light in the dining room.',
    },
  },

  visit: {
    eyebrow: 'Visit Us',
    tamil: 'வருகை',
    heading: 'Find us',
    headingAccent: 'in Salem.',
    description:
      'A Tamil kitchen in Salem, Tamil Nadu. The hours below are sample content for this demo; please confirm before visiting.',
    directionsLabel: 'Get Directions',
    reservationLabel: 'Reserve a Table',
    mapCaption: 'Illustrative map — not to scale.',
    placeholderNote:
      'Sample location and contact details for this demo. The street address is to be confirmed.',
  },

  location: {
    neighborhood: 'Salem',
    city: 'Salem',
    region: 'Tamil Nadu',
    postalCode: '',
    addressLine1: 'Salem',
    addressLine2: 'Tamil Nadu, India',
    // Leave mapsUrl empty while the address is a placeholder. The UI disables directions.
    mapsUrl: '',
    isPlaceholder: true,
  },

  contact: {
    phone: {
      display: '+91 1234567890',
      // Deliberately not a tel: link until the number is verified.
      href: '',
      isPlaceholder: true,
    },
    email: {
      // No email was supplied. Keep this clearly unresolved rather than inventing one.
      display: 'Email to be confirmed',
      href: '',
      isPlaceholder: true,
    },
  },

  // Sample hours only. Replace with client-approved service times before launch.
  hours: [
    { day: 'Monday', hours: 'Closed', closed: true },
    { day: 'Tuesday', hours: '12:00 – 3:00 PM · 6:00 – 10:00 PM' },
    { day: 'Wednesday', hours: '12:00 – 3:00 PM · 6:00 – 10:00 PM' },
    { day: 'Thursday', hours: '12:00 – 3:00 PM · 6:00 – 10:00 PM' },
    { day: 'Friday', hours: '12:00 – 3:00 PM · 6:00 – 10:30 PM' },
    { day: 'Saturday', hours: '12:00 – 3:00 PM · 6:00 – 10:30 PM' },
    { day: 'Sunday', hours: '12:00 – 3:00 PM · 6:00 – 10:00 PM' },
  ],

  hoursSummary: 'Sample hours · Lunch & dinner · Tuesday to Sunday',

  reservation: {
    enabled: true,
    mode: 'demo', // 'demo' shows honest no-submission messaging. Use 'live' only with a real handler.
    eyebrow: 'Reservations',
    tamil: 'முன்பதிவு',
    heading: 'Reserve a table.',
    description:
      'Tell us when you would like to join us. This is a demonstration form; a live site would send the inquiry to the host team or a booking provider.',
    disclaimer:
      'Demonstration only. No table will be reserved, and your details are not sent or stored anywhere.',
    timeSlots: [
      '6:00 PM',
      '6:30 PM',
      '7:00 PM',
      '7:30 PM',
      '8:00 PM',
      '8:30 PM',
      '9:00 PM',
      '9:30 PM',
    ],
    maxPartySize: 8,
    largePartyNote:
      'For parties larger than eight, please call the restaurant once a working phone number is confirmed.',
    successTitle: 'Inquiry prepared — not sent.',
    successMessage:
      'This is a demonstration. No reservation has been made and no message was delivered to the restaurant. A live version of this site would connect to the host team or a booking provider.',
    // Replace this with a real API/provider call when launching for a client:
    // onSubmit: async (values) => { ... },
  },

  social: [],
  // Example: { label: 'Instagram', href: 'https://instagram.com/example' }

  footer: {
    blurb:
      'A Tamil kitchen in Salem — dosa, Chettinad-inspired dishes, biryani, and filter coffee, served with warmth.',
    photoCredit: { label: 'Photography via Pexels', href: 'https://www.pexels.com/license/' },
  },

  seo: {
    title: 'PONNIYIN VIRUNDHU — A Taste of Tamil Tradition',
    description:
      'PONNIYIN VIRUNDHU is a fictional Tamil restaurant website demo in Salem, Tamil Nadu, serving dosa, Chettinad-inspired dishes, biryani, and filter coffee.',
    // Set this to the production URL (for example "https://ponniyin-virundhu.pages.dev")
    // to enable absolute canonical and social URLs.
    siteUrl: '',
    ogImage: '/images/og-ponniyin-virundhu.jpg',
    ogImageAlt:
      'PONNIYIN VIRUNDHU — A Taste of Tamil Tradition, with a South Indian feast on banana leaf.',
    robots: 'noindex, nofollow', // Change to "index, follow" only for a real client site.
    themeColor: '#10100F',
    structuredData: true,
  },
};

export default restaurant;
