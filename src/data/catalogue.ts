// src/data/catalogue.ts
// To add a new product: add an entry to PRODUCTS
// To add a new color variant: add to its product's variants array
// To add a new category: add to CATEGORIES and use the slug in a product

export type Lang = 'en' | 'fr' | 'ar';

export type RoomId = 'bathroom' | 'living-room' | 'bedroom' | 'kitchen';

export interface ColorVariant {
  id: string;           // unique slug e.g. 'silos-terracota'
  name: Record<Lang, string>;
  hex: string;          // representative swatch color
  image: string;        // path to product image e.g. '/products/ARC-SIL-001.jpg?v=2'
  // Optional per-room override. Falls back to /previews/{roomId}/{id}.jpg
  roomImages?: Partial<Record<RoomId, string>>;
}

export interface CatalogueProduct {
  id: string;
  categorySlug: string;
  slug: string;
  name: Record<Lang, string>;
  description: Record<Lang, string>;
  size: string;         // e.g. '10x30 cm'
  finish: string;       // e.g. 'Glazed' | 'Metallic' | 'Matte'
  variants: ColorVariant[];
  isFeatured?: boolean;
}

export interface CatalogueCategory {
  slug: string;
  name: Record<Lang, string>;
  description: Record<Lang, string>;
  image: string;        // hero image for this category
  shape: string;        // shape description e.g. 'Picket 10×30'
}

export const CATEGORIES: CatalogueCategory[] = [
  {
    slug: 'silos',
    name: { en: 'Silos', fr: 'Silos', ar: 'سيلوس' },
    description: {
      en: 'Elongated picket-shaped ceramic tiles with artisanal glazed finishes.',
      fr: 'Carreaux en forme de piquet allongé avec des finitions émaillées artisanales.',
      ar: 'بلاط سيراميك بشكل لقطة مستطيلة بتشطيبات مزججة حرفية.',
    },
    image: '/categories/Silos.png?v=2',
    shape: 'Picket · 10×30 cm',
  },
  {
    slug: 'atelier',
    name: { en: 'Atelier', fr: 'Atelier', ar: 'أتيليه' },
    description: {
      en: 'Artisan leaf-shaped tiles with embossed relief textures and metallic finishes.',
      fr: 'Carreaux feuille artisanaux avec textures en relief et finitions métalliques.',
      ar: 'بلاط على شكل ورقة بنقوش بارزة وتشطيبات معدنية.',
    },
    image: '/categories/Atelier.png?v=2',
    shape: 'Leaf · 10×30 cm',
  },
  {
    slug: 'ducal',
    name: { en: 'Ducal', fr: 'Ducal', ar: 'دوكال' },
    description: {
      en: 'Classic subway-style rectangular tiles with an aged handmade look.',
      fr: 'Carreaux rectangulaires de style métro avec un aspect vieilli fait main.',
      ar: 'بلاط مستطيل بأسلوب المترو بمظهر عتيق مصنوع يدويًا.',
    },
    image: '/categories/Ducal.png?v=2',
    shape: 'Subway · 10×30 cm',
  },
  {
    slug: 'leaf',
    name: { en: 'Leaf', fr: 'Leaf', ar: 'ليف' },
    description: {
      en: 'Architectural leaf-shaped tiles inspired by tropical palm fronds.',
      fr: 'Carreaux feuille architecturaux inspirés des frondes de palmier.',
      ar: 'بلاط بشكل ورقة معمارية مستوحى من سعف النخيل.',
    },
    image: '/categories/Leaf.png?v=2',
    shape: 'Leaf · 15×30 cm',
  },
  {
    slug: 'gonos',
    name: { en: 'Gonos', fr: 'Gonos', ar: 'غونوس' },
    description: {
      en: 'Playful elongated hexagonal tiles with decorative motifs.',
      fr: 'Carreaux hexagonaux allongés ludiques avec motifs décoratifs.',
      ar: 'بلاط سداسي مستطيل مرح بزخارف مميزة.',
    },
    image: '/categories/Gonos.png?v=2',
    shape: 'Hexagon · 15×30 cm',
  },
  {
    slug: 'chic',
    name: { en: 'Chic', fr: 'Chic', ar: 'شيك' },
    description: {
      en: 'Moroccan-inspired scallop tiles with ornate embossed relief.',
      fr: 'Carreaux marocains en écaille avec relief ornemental en saillie.',
      ar: 'بلاط مستوحى من الطابع المغربي بشكل صدفة مع نقوش بارزة.',
    },
    image: '/categories/Chic.png?v=2',
    shape: 'Scallop · 20×20 cm',
  },
  {
    slug: 'kronfel',
    name: { en: 'Kronfel', fr: 'Kronfel', ar: 'كرونفل' },
    description: {
      en: 'Traditional hand-painted tiles with rich floral ornamental patterns.',
      fr: 'Carreaux peints à la main avec riches motifs floraux.',
      ar: 'بلاط تقليدي مطلي يدويًا بزخارف زهرية غنية.',
    },
    image: '/categories/KRONFEL.png?v=2',
    shape: 'Square · 20×20 cm',
  },
  {
    slug: 'casbah',
    name: { en: 'Casbah', fr: 'Casbah', ar: 'قصبة' },
    description: {
      en: 'Andalusian-style hand-painted tiles with vibrant botanical motifs.',
      fr: 'Carreaux de style andalou peints à la main avec motifs botaniques.',
      ar: 'بلاط بالأسلوب الأندلسي مرسوم يدويًا بزخارف نباتية.',
    },
    image: '/categories/Casbah.png?v=2',
    shape: 'Square · 20×20 cm',
  },
  {
    slug: 'yasmine',
    name: { en: 'Yasmine', fr: 'Yasmine', ar: 'ياسمين' },
    description: {
      en: 'Ottoman-inspired hand-painted tiles with intricate scrollwork.',
      fr: "Carreaux d'inspiration ottomane avec arabesques complexes.",
      ar: 'بلاط مستوحى من العثمانية بزخارف تدوير معقدة.',
    },
    image: '/categories/Yasmine.png?v=2',
    shape: 'Square · 20×20 cm',
  },
  {
    slug: 'nardjes',
    name: { en: 'Nardjes', fr: 'Nardjes', ar: 'نارجس' },
    description: {
      en: 'Elegant hand-painted tiles with delicate floral arabesque patterns.',
      fr: 'Carreaux peints à la main avec délicats motifs floraux arabesques.',
      ar: 'بلاط مطلي يدويًا بزخارف عربية زهرية رقيقة.',
    },
    image: '/categories/Narjes.jpg?v=2',
    shape: 'Square · 20×20 cm',
  },
  {
    slug: 'andalous',
    name: { en: 'Andalous', fr: 'Andalous', ar: 'أندلوس' },
    description: {
      en: 'Moorish-inspired tiles with geometric interlace patterns in vivid colors.',
      fr: "Carreaux d'inspiration mauresque avec entrelacs géométriques aux couleurs vives.",
      ar: 'بلاط مستوحى من الأندلس بأنماط هندسية متشابكة بألوان زاهية.',
    },
    image: '/categories/Andalous.png?v=2',
    shape: 'Square · 20×20 cm',
  },
  {
    slug: 'azahra',
    name: { en: 'Azahra', fr: 'Azahra', ar: 'الزهراء' },
    description: {
      en: 'Heritage-inspired hand-painted tiles with ornate medallion motifs.',
      fr: "Carreaux peints à la main d'inspiration patrimoniale avec médaillons ornementaux.",
      ar: 'بلاط مطلي يدويًا بوحي من التراث بزخارف ميداليات مزخرفة.',
    },
    image: '/categories/Azahra.png?v=2',
    shape: 'Square · 20×20 cm',
  },
];

export const PRODUCTS: CatalogueProduct[] = [
  // ─── SILOS ───────────────────────────────────────────
  {
    id: 'silos-plain',
    categorySlug: 'silos',
    slug: 'silos-plain',
    name: { en: 'Silos', fr: 'Silos', ar: 'سيلوس' },
    description: {
      en: 'Picket tile with artisanal glazed finish. 40 pcs/m², 20 pcs/carton.',
      fr: 'Carreau piquet avec finition émaillée artisanale. 40 pcs/m², 20 pcs/carton.',
      ar: 'بلاط لقطة بطلاء حرفي مميز. 40 قطعة/م².',
    },
    size: '10×30 cm',
    finish: 'Glazed',
    isFeatured: true,
    variants: [
      { id: 'silos-terracota', name: { en: 'Terracota', fr: 'Terracota', ar: 'تيراكوتا' }, hex: '#C4703A', image: '/products/ARC-SIL-001.jpg?v=2' },
      { id: 'silos-beige',     name: { en: 'Beige',     fr: 'Beige',     ar: 'بيج'       }, hex: '#D4BFA0', image: '/products/ARC-SIL-002.jpg?v=2' },
      { id: 'silos-antracita', name: { en: 'Antracita', fr: 'Antracita', ar: 'أنتراسيتا' }, hex: '#3D3D3D', image: '/products/ARC-SIL-006.jpg?v=2' },
      { id: 'silos-gris',      name: { en: 'Gris',      fr: 'Gris',      ar: 'رمادي'     }, hex: '#9B9B9B', image: '/products/ARC-SIL-007.jpg?v=2' },
    ],
  },
  {
    id: 'silos-dec',
    categorySlug: 'silos',
    slug: 'silos-dec',
    name: { en: 'Silos Dec', fr: 'Silos Dec', ar: 'سيلوس ديك' },
    description: {
      en: 'Decorative picket tile with hand-painted tropical motifs. 3–5 faces.',
      fr: 'Carreau piquet décoratif avec motifs tropicaux peints à la main. 3–5 faces.',
      ar: 'بلاط لقطة زخرفي بدوافع استوائية مرسومة يدويًا.',
    },
    size: '10×30 cm',
    finish: 'Hand-painted',
    isFeatured: true,
    variants: [
      { id: 'silos-dec-natura-beige',    name: { en: 'Natura Beige',    fr: 'Natura Beige',    ar: 'ناتورا بيج'    }, hex: '#D4BFA0', image: '/products/ARC-SIL-003.jpg?v=2' },
      { id: 'silos-dec-jamaica-beige',   name: { en: 'Jamaica Beige',   fr: 'Jamaica Beige',   ar: 'جامايكا بيج'   }, hex: '#C4703A', image: '/products/ARC-SIL-004.jpg?v=2' },
      { id: 'silos-dec-celestina-beige', name: { en: 'Celestina Beige', fr: 'Celestina Beige', ar: 'سيليستينا بيج' }, hex: '#E8D5BC', image: '/products/ARC-SIL-005.jpg?v=2' },
      { id: 'silos-dec-natura-gris',     name: { en: 'Natura Gris',     fr: 'Natura Gris',     ar: 'ناتورا رمادي'  }, hex: '#9B9B9B', image: '/products/ARC-SIL-008.jpg?v=2' },
      { id: 'silos-dec-jamaica-gris',    name: { en: 'Jamaica Gris',    fr: 'Jamaica Gris',    ar: 'جامايكا رمادي' }, hex: '#7D7D7D', image: '/products/ARC-SIL-009.jpg?v=2' },
      { id: 'silos-dec-celestina-gris',  name: { en: 'Celestina Gris',  fr: 'Celestina Gris',  ar: 'سيليستينا رمادي' }, hex: '#B0B0B0', image: '/products/ARC-SIL-010.jpg?v=2' },
      { id: 'silos-dec-gold',            name: { en: 'Gold',            fr: 'Gold',            ar: 'ذهبي'          }, hex: '#C9A84C', image: '/products/ARC-SIL-011.jpg?v=2' },
      { id: 'silos-dec-beige',           name: { en: 'Dec Beige',       fr: 'Dec Beige',       ar: 'ديك بيج'       }, hex: '#D4BFA0', image: '/products/ARC-SIL-012.jpg?v=2' },
      { id: 'silos-dec-mix-beige',       name: { en: 'Mix Beige',       fr: 'Mix Beige',       ar: 'ميكس بيج'      }, hex: '#C8A882', image: '/products/ARC-SIL-013.jpg?v=2' },
      { id: 'silos-dec-silver',          name: { en: 'Silver',          fr: 'Silver',          ar: 'فضي'           }, hex: '#A8A8A8', image: '/products/ARC-SIL-014.jpg?v=2' },
      { id: 'silos-dec-gris',            name: { en: 'Dec Gris',        fr: 'Dec Gris',        ar: 'ديك رمادي'     }, hex: '#9B9B9B', image: '/products/ARC-SIL-015.jpg?v=2' },
      { id: 'silos-dec-mix-gris',        name: { en: 'Mix Gris',        fr: 'Mix Gris',        ar: 'ميكس رمادي'    }, hex: '#808080', image: '/products/ARC-SIL-016.jpg?v=2' },
    ],
  },

  // ─── ATELIER ─────────────────────────────────────────
  {
    id: 'atelier-r1',
    categorySlug: 'atelier',
    slug: 'atelier-r1',
    name: { en: 'Atelier R1', fr: 'Atelier R1', ar: 'أتيليه R1' },
    description: {
      en: 'Embossed leaf tile. Available in plain body, metallic and iridescent finishes.',
      fr: 'Carreau feuille gaufré. Disponible en corps uni, finitions métalliques et irisées.',
      ar: 'بلاط ورقة منقوش. متوفر بجسم سادة وتشطيبات معدنية ومتقزحة.',
    },
    size: '10×30 cm',
    finish: 'Multi-finish',
    isFeatured: true,
    variants: [
      { id: 'atelier-pb-miel',          name: { en: 'Pb Miel',          fr: 'Pb Miel',          ar: 'Pb عسلي'          }, hex: '#C9A84C', image: '/products/ARC-ATL-001.jpg?v=2' },
      { id: 'atelier-ec-blanc',         name: { en: 'EC Blanc',         fr: 'EC Blanc',         ar: 'EC أبيض'          }, hex: '#F5F5F0', image: '/products/ARC-ATL-002.jpg?v=2' },
      { id: 'atelier-pb-vert',          name: { en: 'Pb Vert',          fr: 'Pb Vert',          ar: 'Pb أخضر'          }, hex: '#2D5A27', image: '/products/ARC-ATL-003.jpg?v=2' },
      { id: 'atelier-pb-bleu',          name: { en: 'Pb Bleu',          fr: 'Pb Bleu',          ar: 'Pb أزرق'          }, hex: '#1A3A8F', image: '/products/ARC-ATL-004.jpg?v=2' },
      { id: 'atelier-mtl-gold',         name: { en: 'Mtl Gold',         fr: 'Mtl Gold',         ar: 'معدني ذهبي'       }, hex: '#D4AF37', image: '/products/ARC-ATL-005.jpg?v=2' },
      { id: 'atelier-mtl-rose-gold',    name: { en: 'Mtl Rose Gold',    fr: 'Mtl Rose Gold',    ar: 'معدني روز غولد'   }, hex: '#B5776B', image: '/products/ARC-ATL-006.jpg?v=2' },
      { id: 'atelier-mtl-silver',       name: { en: 'Mtl Silver',       fr: 'Mtl Silver',       ar: 'معدني فضي'        }, hex: '#A8A8A8', image: '/products/ARC-ATL-007.jpg?v=2' },
      { id: 'atelier-mtl-bleu-petrole', name: { en: 'Mtl Bleu Pétrole', fr: 'Mtl Bleu Pétrole', ar: 'معدني أزرق بترولي' }, hex: '#1B7A8C', image: '/products/ARC-ATL-008.jpg?v=2' },
      { id: 'atelier-ird-rose',         name: { en: 'Ird Rose',         fr: 'Ird Rose',         ar: 'متقزح وردي'       }, hex: '#E8B4B8', image: '/products/ARC-ATL-009.jpg?v=2' },
      { id: 'atelier-ird-bleu',         name: { en: 'Ird Bleu',         fr: 'Ird Bleu',         ar: 'متقزح أزرق'       }, hex: '#3CB8B2', image: '/products/ARC-ATL-010.jpg?v=2' },
    ],
  },
  {
    id: 'atelier-dec',
    categorySlug: 'atelier',
    slug: 'atelier-dec',
    name: { en: 'Atelier Dec Floral', fr: 'Atelier Dec Floral', ar: 'أتيليه ديك فلورال' },
    description: {
      en: 'Picket tile with hand-painted floral bouquet décor. 6 faces.',
      fr: 'Carreau piquet avec décor bouquet floral peint à la main. 6 faces.',
      ar: 'بلاط لقطة بزخرفة باقة أزهار مرسومة يدويًا. 6 وجوه.',
    },
    size: '10×30 cm',
    finish: 'Hand-painted',
    variants: [
      { id: 'atelier-floral-3', name: { en: 'Floral 3', fr: 'Floral 3', ar: 'فلورال 3' }, hex: '#E8563A', image: '/products/ARC-ATL-011.jpg?v=2' },
      { id: 'atelier-floral-4', name: { en: 'Floral 4', fr: 'Floral 4', ar: 'فلورال 4' }, hex: '#5A9BD4', image: '/products/ARC-ATL-012.jpg?v=2' },
    ],
  },

  // ─── DUCAL ───────────────────────────────────────────
  {
    id: 'ducal-plain',
    categorySlug: 'ducal',
    slug: 'ducal-plain',
    name: { en: 'Ducal', fr: 'Ducal', ar: 'دوكال' },
    description: {
      en: 'Handmade-look subway tile. 34 pcs/1.02 m², 18 pcs/carton.',
      fr: 'Carreau métro aspect fait main. 34 pcs/1.02 m², 18 pcs/carton.',
      ar: 'بلاط مترو بمظهر مصنوع يدويًا.',
    },
    size: '10×30 cm',
    finish: 'Glazed',
    isFeatured: true,
    variants: [
      { id: 'ducal-terracota', name: { en: 'Terracota', fr: 'Terracota', ar: 'تيراكوتا' }, hex: '#C4703A', image: '/products/ARC-DUC-001.jpg?v=2' },
      { id: 'ducal-beige',     name: { en: 'Beige',     fr: 'Beige',     ar: 'بيج'       }, hex: '#D4BFA0', image: '/products/ARC-DUC-002.jpg?v=2' },
      { id: 'ducal-antracita', name: { en: 'Antracita', fr: 'Antracita', ar: 'أنتراسيتا' }, hex: '#3D3D3D', image: '/products/ARC-DUC-005.jpg?v=2' },
      { id: 'ducal-gris',      name: { en: 'Gris',      fr: 'Gris',      ar: 'رمادي'     }, hex: '#9B9B9B', image: '/products/ARC-DUC-006.jpg?v=2' },
    ],
  },
  {
    id: 'ducal-dec',
    categorySlug: 'ducal',
    slug: 'ducal-dec',
    name: { en: 'Ducal Dec', fr: 'Ducal Dec', ar: 'دوكال ديك' },
    description: {
      en: 'Decorative subway tile with tropical and ornamental décors. 3 faces.',
      fr: 'Carreau métro décoratif avec motifs tropicaux et ornementaux. 3 faces.',
      ar: 'بلاط مترو زخرفي بدوافع استوائية وزخرفية.',
    },
    size: '10×30 cm',
    finish: 'Hand-painted',
    variants: [
      { id: 'ducal-dec-tucan',     name: { en: 'Tucan',     fr: 'Tucan',     ar: 'توكان'      }, hex: '#2D5A27', image: '/products/ARC-DUC-003.jpg?v=2' },
      { id: 'ducal-dec-jamaica',   name: { en: 'Jamaica',   fr: 'Jamaica',   ar: 'جامايكا'    }, hex: '#E8563A', image: '/products/ARC-DUC-004.jpg?v=2' },
      { id: 'ducal-dec-celestina', name: { en: 'Celestina', fr: 'Celestina', ar: 'سيليستينا'  }, hex: '#5A9BD4', image: '/products/ARC-DUC-007.jpg?v=2' },
      { id: 'ducal-dec-gold',      name: { en: 'Gold',      fr: 'Gold',      ar: 'ذهبي'       }, hex: '#D4AF37', image: '/products/ARC-DUC-008.jpg?v=2' },
      { id: 'ducal-dec-beige',     name: { en: 'Dec Beige', fr: 'Dec Beige', ar: 'ديك بيج'    }, hex: '#C8A882', image: '/products/ARC-DUC-009.jpg?v=2' },
      { id: 'ducal-dec-silver',    name: { en: 'Silver',    fr: 'Silver',    ar: 'فضي'        }, hex: '#A8A8A8', image: '/products/ARC-DUC-010.jpg?v=2' },
      { id: 'ducal-dec-gris',      name: { en: 'Dec Gris',  fr: 'Dec Gris',  ar: 'ديك رمادي'  }, hex: '#9B9B9B', image: '/products/ARC-DUC-011.jpg?v=2' },
    ],
  },

  // ─── LEAF ────────────────────────────────────────────
  {
    id: 'leaf-r1',
    categorySlug: 'leaf',
    slug: 'leaf-r1',
    name: { en: 'Leaf R1', fr: 'Leaf R1', ar: 'ليف R1' },
    description: {
      en: 'Architectural leaf tile. Plain body, metallic and floral versions. 27 pcs/m².',
      fr: 'Carreau feuille architectural. Corps uni, versions métalliques et florales.',
      ar: 'بلاط ورقة معماري. جسم سادة ونسخ معدنية وزهرية.',
    },
    size: '15×30 cm',
    finish: 'Multi-finish',
    isFeatured: true,
    variants: [
      { id: 'leaf-pb-bleu',          name: { en: 'Pb Bleu',          fr: 'Pb Bleu',          ar: 'أزرق'         }, hex: '#1A3A8F', image: '/products/ARC-LEA-001.jpg?v=2' },
      { id: 'leaf-pb-miel',          name: { en: 'Pb Miel',          fr: 'Pb Miel',          ar: 'عسلي'         }, hex: '#C9A84C', image: '/products/ARC-LEA-002.jpg?v=2' },
      { id: 'leaf-pb-vert',          name: { en: 'Pb Vert',          fr: 'Pb Vert',          ar: 'أخضر'         }, hex: '#2D5A27', image: '/products/ARC-LEA-003.jpg?v=2' },
      { id: 'leaf-ec-blanc',         name: { en: 'EC Blanc',         fr: 'EC Blanc',         ar: 'أبيض'         }, hex: '#F5F5F0', image: '/products/ARC-LEA-004.jpg?v=2' },
      { id: 'leaf-mtl-rose-gold',    name: { en: 'Mtl Rose Gold',    fr: 'Mtl Rose Gold',    ar: 'روز غولد'     }, hex: '#B5776B', image: '/products/ARC-LEA-005.jpg?v=2' },
      { id: 'leaf-mtl-mauve',        name: { en: 'Mtl Mauve',        fr: 'Mtl Mauve',        ar: 'معدني موف'    }, hex: '#7B5EA7', image: '/products/ARC-LEA-006.jpg?v=2' },
      { id: 'leaf-mtl-bleu-petrole', name: { en: 'Mtl Bleu Pétrole', fr: 'Mtl Bleu Pétrole', ar: 'أزرق بترولي' }, hex: '#1B7A8C', image: '/products/ARC-LEA-007.jpg?v=2' },
      { id: 'leaf-floral-1',         name: { en: 'Floral 1',         fr: 'Floral 1',         ar: 'فلورال 1'     }, hex: '#6DAE6D', image: '/products/ARC-LEA-008.jpg?v=2' },
      { id: 'leaf-floral-2',         name: { en: 'Floral 2',         fr: 'Floral 2',         ar: 'فلورال 2'     }, hex: '#E8A020', image: '/products/ARC-LEA-009.jpg?v=2' },
      { id: 'leaf-floral-3',         name: { en: 'Floral 3',         fr: 'Floral 3',         ar: 'فلورال 3'     }, hex: '#E8563A', image: '/products/ARC-LEA-010.jpg?v=2' },
      { id: 'leaf-floral-4',         name: { en: 'Floral 4',         fr: 'Floral 4',         ar: 'فلورال 4'     }, hex: '#5A9BD4', image: '/products/ARC-LEA-011.jpg?v=2' },
    ],
  },

  // ─── GONOS ───────────────────────────────────────────
  {
    id: 'gonos',
    categorySlug: 'gonos',
    slug: 'gonos',
    name: { en: 'Gonos', fr: 'Gonos', ar: 'غونوس' },
    description: {
      en: "Elongated hexagonal tile. Plain white and decorative children's motifs. 30 pcs/m².",
      fr: 'Carreau hexagonal allongé. Blanc uni et motifs décoratifs enfants.',
      ar: 'بلاط سداسي مستطيل. أبيض سادة وزخارف أطفال.',
    },
    size: '15×30 cm',
    finish: 'Matte / Hand-painted',
    variants: [
      { id: 'gonos-blanc',    name: { en: 'Blanc',    fr: 'Blanc',    ar: 'أبيض' }, hex: '#F5F5F0', image: '/products/ARC-GON-002.jpg?v=2' },
      { id: 'gonos-dec-girl', name: { en: 'Dec Girl', fr: 'Dec Girl', ar: 'بنت'  }, hex: '#F2A0B0', image: '/products/ARC-GON-001.jpg?v=2' },
      { id: 'gonos-dec-boy',  name: { en: 'Dec Boy',  fr: 'Dec Boy',  ar: 'ولد'  }, hex: '#A0C4F2', image: '/products/ARC-GON-003.jpg?v=2' },
    ],
  },

  // ─── CHIC ────────────────────────────────────────────
  {
    id: 'chic-r1',
    categorySlug: 'chic',
    slug: 'chic-r1',
    name: { en: 'Chic R1', fr: 'Chic R1', ar: 'شيك R1' },
    description: {
      en: 'Scallop tile with fan embossed relief. Glossy body finish. 42 pcs/m².',
      fr: 'Carreau écaille avec relief ventail. Finition corps brillant.',
      ar: 'بلاط صدفي بنقش مروحي بارز. تشطيب جسم لامع.',
    },
    size: '20×20 cm',
    finish: 'Glossy',
    isFeatured: true,
    variants: [
      { id: 'chic-r1-pb-bleu',  name: { en: 'Pb Bleu',  fr: 'Pb Bleu',  ar: 'أزرق'  }, hex: '#1A3A8F', image: '/products/ARC-CHI-001.jpg?v=2' },
      { id: 'chic-r1-pb-miel',  name: { en: 'Pb Miel',  fr: 'Pb Miel',  ar: 'عسلي'  }, hex: '#C9A84C', image: '/products/ARC-CHI-002.jpg?v=2' },
      { id: 'chic-r1-pb-vert',  name: { en: 'Pb Vert',  fr: 'Pb Vert',  ar: 'أخضر'  }, hex: '#2D5A27', image: '/products/ARC-CHI-003.jpg?v=2' },
      { id: 'chic-r1-ec-blanc', name: { en: 'EC Blanc', fr: 'EC Blanc', ar: 'أبيض'  }, hex: '#F5F5F0', image: '/products/ARC-CHI-004.jpg?v=2' },
    ],
  },
  {
    id: 'chic-r2',
    categorySlug: 'chic',
    slug: 'chic-r2',
    name: { en: 'Chic R2', fr: 'Chic R2', ar: 'شيك R2' },
    description: {
      en: 'Moroccan arabesque tile with ornate floral relief. Plain body and metallic finishes.',
      fr: 'Carreau arabesque marocain avec relief floral ornemental. Corps uni et finitions métalliques.',
      ar: 'بلاط أرابيسك مغربي بنقش زهري زخرفي.',
    },
    size: '20×20 cm',
    finish: 'Glossy / Metallic',
    isFeatured: true,
    variants: [
      { id: 'chic-r2-pb-bleu',           name: { en: 'Pb Bleu',          fr: 'Pb Bleu',          ar: 'أزرق'          }, hex: '#1A3A8F', image: '/products/ARC-CHI-005.jpg?v=2' },
      { id: 'chic-r2-pb-miel',           name: { en: 'Pb Miel',          fr: 'Pb Miel',          ar: 'عسلي'          }, hex: '#C9A84C', image: '/products/ARC-CHI-006.jpg?v=2' },
      { id: 'chic-r2-pb-vert',           name: { en: 'Pb Vert',          fr: 'Pb Vert',          ar: 'أخضر'          }, hex: '#2D5A27', image: '/products/ARC-CHI-007.jpg?v=2' },
      { id: 'chic-r2-ec-blanc',          name: { en: 'EC Blanc',         fr: 'EC Blanc',         ar: 'أبيض'          }, hex: '#F5F5F0', image: '/products/ARC-CHI-008.jpg?v=2' },
      { id: 'chic-r2-mtl-bleu-cobalte',  name: { en: 'Mtl Bleu Cobalte', fr: 'Mtl Bleu Cobalte', ar: 'أزرق كوبالت'  }, hex: '#0050C8', image: '/products/ARC-CHI-009.jpg?v=2' },
      { id: 'chic-r2-mtl-mauve',         name: { en: 'Mtl Mauve',        fr: 'Mtl Mauve',        ar: 'موف'           }, hex: '#C040C0', image: '/products/ARC-CHI-010.jpg?v=2' },
      { id: 'chic-r2-mtl-gold',          name: { en: 'Mtl Gold',         fr: 'Mtl Gold',         ar: 'معدني ذهبي'    }, hex: '#D4AF37', image: '/products/ARC-CHI-011.jpg?v=2' },
      { id: 'chic-r2-mtl-rose-gold',     name: { en: 'Mtl Rose Gold',    fr: 'Mtl Rose Gold',    ar: 'روز غولد'      }, hex: '#B5776B', image: '/products/ARC-CHI-012.jpg?v=2' },
      { id: 'chic-r2-mtl-silver',        name: { en: 'Mtl Silver',       fr: 'Mtl Silver',       ar: 'معدني فضي'     }, hex: '#A8A8A8', image: '/products/ARC-CHI-013.jpg?v=2' },
      { id: 'chic-r2-mtl-bleu-petrole',  name: { en: 'Mtl Bleu Pétrole', fr: 'Mtl Bleu Pétrole', ar: 'أزرق بترولي'  }, hex: '#1B7A8C', image: '/products/ARC-CHI-014.jpg?v=2' },
    ],
  },

  // ─── KRONFEL ─────────────────────────────────────────
  {
    id: 'kronfel',
    categorySlug: 'kronfel',
    slug: 'kronfel',
    name: { en: 'Kronfel', fr: 'Kronfel', ar: 'كرونفل' },
    description: {
      en: 'Traditional hand-painted tile with rich blue and gold ornamental patterns.',
      fr: 'Carreau peint à la main avec riches motifs ornementaux bleus et dorés.',
      ar: 'بلاط تقليدي مطلي يدويًا بزخارف زخرفية غنية باللون الأزرق والذهبي.',
    },
    size: '20×20 cm',
    finish: 'Hand-painted',
    variants: [
      { id: 'kronfel-classic', name: { en: 'Classic', fr: 'Classic', ar: 'كلاسيك' }, hex: '#1A3A8F', image: '/products/ARC-KRO-001.jpg?v=2' },
    ],
  },

  // ─── CASBAH ──────────────────────────────────────────
  {
    id: 'casbah',
    categorySlug: 'casbah',
    slug: 'casbah',
    name: { en: 'Casbah', fr: 'Casbah', ar: 'قصبة' },
    description: {
      en: 'Andalusian hand-painted tile with vibrant botanical motifs.',
      fr: 'Carreau andalou peint à la main avec motifs botaniques vibrants.',
      ar: 'بلاط أندلسي مرسوم يدويًا بزخارف نباتية زاهية.',
    },
    size: '20×20 cm',
    finish: 'Hand-painted',
    variants: [
      { id: 'casbah-classic', name: { en: 'Classic', fr: 'Classic', ar: 'كلاسيك' }, hex: '#2D5A27', image: '/products/ARC-CAS-001.jpg?v=2' },
    ],
  },

  // ─── YASMINE ─────────────────────────────────────────
  {
    id: 'yasmine',
    categorySlug: 'yasmine',
    slug: 'yasmine',
    name: { en: 'Yasmine', fr: 'Yasmine', ar: 'ياسمين' },
    description: {
      en: 'Ottoman-inspired hand-painted tile with intricate scrollwork.',
      fr: "Carreau d'inspiration ottomane avec arabesques complexes.",
      ar: 'بلاط مستوحى من العثمانية بزخارف تدوير معقدة.',
    },
    size: '20×20 cm',
    finish: 'Hand-painted',
    variants: [
      { id: 'yasmine-classic', name: { en: 'Classic', fr: 'Classic', ar: 'كلاسيك' }, hex: '#C9A84C', image: '/products/ARC-YAS-001.jpg?v=2' },
    ],
  },

  // ─── NARDJES ─────────────────────────────────────────
  {
    id: 'nardjes',
    categorySlug: 'nardjes',
    slug: 'nardjes',
    name: { en: 'Nardjes', fr: 'Nardjes', ar: 'نارجس' },
    description: {
      en: 'Elegant hand-painted tile with delicate floral arabesque patterns.',
      fr: 'Carreau peint à la main avec délicats motifs floraux arabesques.',
      ar: 'بلاط مطلي يدويًا بزخارف عربية زهرية رقيقة.',
    },
    size: '20×20 cm',
    finish: 'Hand-painted',
    variants: [
      { id: 'nardjes-classic', name: { en: 'Classic', fr: 'Classic', ar: 'كلاسيك' }, hex: '#8B6F47', image: '/products/ARC-NAR-001.jpg?v=2' },
    ],
  },

  // ─── ANDALOUS ────────────────────────────────────────
  {
    id: 'andalous',
    categorySlug: 'andalous',
    slug: 'andalous',
    name: { en: 'Andalous', fr: 'Andalous', ar: 'أندلوس' },
    description: {
      en: 'Moorish-inspired tile with geometric interlace patterns in vivid colors.',
      fr: "Carreau d'inspiration mauresque avec entrelacs géométriques aux couleurs vives.",
      ar: 'بلاط مستوحى من الأندلس بأنماط هندسية متشابكة بألوان زاهية.',
    },
    size: '20×20 cm',
    finish: 'Hand-painted',
    variants: [
      { id: 'andalous-classic', name: { en: 'Classic', fr: 'Classic', ar: 'كلاسيك' }, hex: '#1A5276', image: '/products/ARC-AND-001.jpg?v=2' },
    ],
  },

  // ─── AZAHRA ──────────────────────────────────────────
  {
    id: 'azahra',
    categorySlug: 'azahra',
    slug: 'azahra',
    name: { en: 'Azahra', fr: 'Azahra', ar: 'الزهراء' },
    description: {
      en: 'Heritage-inspired hand-painted tile with ornate medallion motifs.',
      fr: "Carreau peint à la main d'inspiration patrimoniale avec médaillons ornementaux.",
      ar: 'بلاط مطلي يدويًا بوحي من التراث بزخارف ميداليات مزخرفة.',
    },
    size: '20×20 cm',
    finish: 'Hand-painted',
    variants: [
      { id: 'azahra-classic', name: { en: 'Classic', fr: 'Classic', ar: 'كلاسيك' }, hex: '#C9A84C', image: '/products/ARC-AZA-001.jpg?v=2' },
    ],
  },
];

// Helper: get products by category
export function getProductsByCategory(slug: string): CatalogueProduct[] {
  return PRODUCTS.filter((p) => p.categorySlug === slug);
}

// Helper: get a single product
export function getProductBySlug(slug: string): CatalogueProduct | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

// Helper: get featured products
export function getFeaturedProducts(): CatalogueProduct[] {
  return PRODUCTS.filter((p) => p.isFeatured);
}

// ─── Flat variant helpers ─────────────────────────────────────────────────────
// Each variant becomes an independent display unit (own image, own card)
export interface FlatVariant {
  variantId: string;
  productSlug: string;
  categorySlug: string;
  name: Record<Lang, string>;
  productName: Record<Lang, string>;
  image: string;
  hex: string;
  size: string;
  finish: string;
  isFeatured: boolean;
}

export function getAllFlatVariants(): FlatVariant[] {
  return PRODUCTS.flatMap((p) =>
    p.variants.map((v) => ({
      variantId: v.id,
      productSlug: p.slug,
      categorySlug: p.categorySlug,
      name: v.name,
      productName: p.name,
      image: v.image,
      hex: v.hex,
      size: p.size,
      finish: p.finish,
      isFeatured: p.isFeatured ?? false,
    }))
  );
}

export function getFlatVariantsByCategory(categorySlug: string): FlatVariant[] {
  return getAllFlatVariants().filter((fv) => fv.categorySlug === categorySlug);
}

export function getFeaturedFlatVariants(): FlatVariant[] {
  return getAllFlatVariants().filter((fv) => fv.isFeatured);
}
