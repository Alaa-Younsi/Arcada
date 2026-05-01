import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
  productSchema?: {
    name: string;
    description: string;
    image: string;
    sku?: string;
  };
}

const SITE_URL    = 'https://arcada.dz';
const SITE_NAME   = 'ARCADA';
const DEFAULT_IMG = '/image6.png';

const DEFAULT_TITLE = 'ARCADA — Carreaux Céramiques | Fabricant Algérien Exclusif';
const DEFAULT_DESC  =
  "Premier et unique fabricant algérien de carreaux céramiques de prestige. 9 collections exclusives — conçues, produites et vendues directement par ARCADA depuis l'Algérie.";

const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: DEFAULT_DESC,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Sebala, Draria',
    addressLocality: 'Alger',
    addressCountry: 'DZ',
  },
  telephone: '+213550242454',
  email: 'contact@arcada.dz',
  sameAs: [
    'https://www.instagram.com/arcada_original_tile/',
    'https://www.facebook.com/profile.php?id=61562889557376',
  ],
};

export function SEOHead({
  title       = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  image       = DEFAULT_IMG,
  url         = SITE_URL,
  type        = 'website',
  noIndex     = false,
  productSchema,
}: SEOHeadProps) {
  const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  const fullUrl   = url.startsWith('http')   ? url   : `${SITE_URL}${url}`;

  const productJsonLd = productSchema
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: productSchema.name,
        description: productSchema.description,
        image: productSchema.image.startsWith('http')
          ? productSchema.image
          : `${SITE_URL}${productSchema.image}`,
        sku: productSchema.sku,
        brand: { '@type': 'Brand', name: SITE_NAME },
        manufacturer: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'DZD',
          seller: { '@type': 'Organization', name: SITE_NAME },
        },
      }
    : null;

  return (
    <Helmet>
      {/* Core */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'} />
      <meta name="author" content={SITE_NAME} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type"        content={type} />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={fullImage} />
      <meta property="og:image:alt"   content={`${SITE_NAME} — carreaux céramiques`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url"         content={fullUrl} />
      <meta property="og:locale"      content="fr_DZ" />

      {/* Twitter / X */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={fullImage} />

      {/* Structured data */}
      <script type="application/ld+json">{JSON.stringify(ORG_SCHEMA)}</script>
      {productJsonLd && (
        <script type="application/ld+json">{JSON.stringify(productJsonLd)}</script>
      )}
    </Helmet>
  );
}
