// Single source of truth for business details, services and prices.
// Anything marked TODO needs confirming with A&D before launch (run `npm run todos`).

export const business = {
  name: 'A&D Billiards LLC',
  shortName: 'A&D Billiards',
  tagline: 'Pool table moving, refelting & repair',
  phone: '(440) 523-9217',
  phoneHref: 'tel:+14405239217',
  email: 'adbilliardsllc@gmail.com',
  city: 'North Olmsted',
  region: 'OH',
  postalCode: '44070',
  facebook: 'https://www.facebook.com/adbilliardsllc',
  yearsExperience: '15+',
  hours: '', // TODO: e.g. 'Mon–Sat 8am–6pm'
  insured: '', // TODO: e.g. 'Licensed & insured'
};

export const nav = [
  { label: 'Moving', href: '/pool-table-moving/' },
  { label: 'Refelt & Repair', href: '/refelting-repair/' },
  { label: 'Tables for Sale', href: '/pool-tables-for-sale/' },
  { label: 'FAQ & Service Area', href: '/faq/' },
];

/** Starting prices. `null` renders as a visible TODO placeholder. */
export const prices = {
  move: null as number | null, // TODO
  roomToRoom: null as number | null, // TODO
  storage: null as number | null, // TODO
  usedPickup: null as number | null, // TODO
  stairsPerFlight: null as number | null, // TODO
  refeltStandard: null as number | null, // TODO
  refeltTournament: null as number | null, // TODO
  recushion: null as number | null, // TODO
  install: null as number | null, // TODO
};

export function formatPrice(n: number | null, prefix = 'from '): string {
  return n == null ? `${prefix}[$___]` : `${prefix}$${n.toLocaleString('en-US')}`;
}

export const services = [
  {
    name: 'Pool table moving',
    blurb: 'Teardown, padded transport, reassembly, slate leveling and cloth re-stretched. Room to room or house to house.',
    price: formatPrice(prices.move),
    href: '/pool-table-moving/',
  },
  {
    name: 'Refelting',
    blurb: 'Old cloth stripped, new cloth stretched tight on the bed and rails. Pick a color to match your room.',
    price: formatPrice(prices.refeltStandard),
    href: '/refelting-repair/',
  },
  {
    name: 'Recushioning',
    blurb: 'New rubber on all six rails for dead or cracked bumpers. Best done with a refelt.',
    price: formatPrice(prices.recushion),
    href: '/refelting-repair/#cushions',
  },
  {
    name: 'Build & install',
    blurb: "New table, storage pickup or a table that's been sitting in pieces. We set the slate, level it and cloth it.",
    price: formatPrice(prices.install),
    href: '/refelting-repair/#leveling',
  },
  {
    name: 'Tables for sale',
    blurb: "Pre-owned tables we've checked over, with setup in your room.",
    price: 'see stock',
    href: '/pool-tables-for-sale/',
  },
];

/** Current listings. Add `image` (an imported photo) once real listing photos exist. */
export const listings = [
  {
    title: '8′ table with ping pong & dining tops',
    price: '$3,500',
    details: 'Includes ping pong top, cue caddy and dining top.', // TODO: slate, cloth color, condition
    status: 'in-stock' as 'in-stock' | 'sold',
  },
];

/**
 * Service area. A city with an `intro` gets its own page at /service-area/<slug>/.
 * Only add an intro once it's real, specific copy; thin copy-paste city pages hurt SEO.
 * TODO: confirm the area with A&D.
 */
export const serviceArea: {
  group: string;
  cities: { name: string; slug: string; intro?: string }[];
}[] = [
  {
    group: 'West side',
    cities: [
      {
        name: 'North Olmsted',
        slug: 'north-olmsted',
        intro:
          "North Olmsted is home base for A&D Billiards, so we're usually just a few minutes away. Whether you're moving a table into a new place off Lorain Road or finally getting the basement table refelted, we can often get you on the calendar quickly.",
      },
      { name: 'Westlake', slug: 'westlake' },
      { name: 'Bay Village', slug: 'bay-village' },
      { name: 'Rocky River', slug: 'rocky-river' },
      { name: 'Fairview Park', slug: 'fairview-park' },
      { name: 'Lakewood', slug: 'lakewood' },
      { name: 'Olmsted Falls', slug: 'olmsted-falls' },
    ],
  },
  {
    group: 'South & southwest',
    cities: [
      { name: 'Strongsville', slug: 'strongsville' },
      { name: 'Berea', slug: 'berea' },
      { name: 'Middleburg Heights', slug: 'middleburg-heights' },
      { name: 'Brook Park', slug: 'brook-park' },
      { name: 'Parma', slug: 'parma' },
      { name: 'North Royalton', slug: 'north-royalton' },
      { name: 'Brunswick', slug: 'brunswick' },
    ],
  },
  {
    group: 'Lorain County',
    cities: [
      { name: 'Avon', slug: 'avon' },
      { name: 'Avon Lake', slug: 'avon-lake' },
      { name: 'North Ridgeville', slug: 'north-ridgeville' },
      { name: 'Elyria', slug: 'elyria' },
      { name: 'Sheffield', slug: 'sheffield' },
    ],
  },
  {
    group: 'Cleveland & east',
    cities: [
      { name: 'Cleveland', slug: 'cleveland' },
      { name: 'Independence', slug: 'independence' },
      { name: 'Seven Hills', slug: 'seven-hills' },
    ],
  },
];

export const allCities = serviceArea.flatMap((g) => g.cities);
