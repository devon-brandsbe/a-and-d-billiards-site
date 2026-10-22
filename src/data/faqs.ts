// FAQ content. Answers are HTML strings (links allowed).
// Text in [square brackets] is a placeholder: it renders highlighted and
// is stripped from the FAQPage structured data until it's filled in.

export type Faq = { q: string; a: string; todo?: boolean };
export type FaqGroup = { id: string; title: string; items: Faq[] };

export const moving: Faq[] = [
  {
    q: "Can't regular movers just move my pool table?",
    a: "They can carry it, but most can't take the slate apart or set it back up level. A table moved in one piece can crack its slate or rack the frame, and an unleveled table never plays right.",
  },
  {
    q: 'How long does a move take?',
    a: '[Typical time, e.g. a few hours for most home moves.] Stairs and longer drives add time.',
    todo: true,
  },
  {
    q: 'Do I need new felt after a move?',
    a: "Not always. If your cloth is in good shape we re-stretch it. If it's worn, faded or torn, a move is the cheapest time to replace it since the table is already apart.",
  },
  {
    q: 'Is my table covered during the move?',
    a: '[Insurance and guarantee details: confirm with A&D.]',
    todo: true,
  },
  {
    q: 'Do you move one-piece slate or bar tables?',
    a: '[Confirm: coin-op bar tables and one-piece slate.]',
    todo: true,
  },
  {
    q: 'Can you get a table down to my basement?',
    a: 'Almost always. Taken apart, the biggest pieces are the slate slabs, which fit down most stairways. Send a photo of the stairs and the turn at the bottom.',
  },
  {
    q: 'How big a room do I need?',
    a: 'For an 8′ table with standard cues, about 13′4″ × 17′. See the full <a href="/pool-table-moving/#room-size">room size guide</a>.',
  },
];

export const cloth: Faq[] = [
  {
    q: 'How do I know my table needs new felt?',
    a: 'Bald or shiny spots, tears, pilling, or balls that drift instead of rolling straight. If the cloth is loose, it may just need re-stretching.',
  },
  {
    q: 'How often should a pool table be refelted?',
    a: "It depends on how much it's played. A lightly used home table can go many years. Replace it when you see bald spots, tears, pilling or the ball stops rolling straight.",
  },
  {
    q: 'How long does a refelt take?',
    a: '[Typical time for a refelt in your home.] You can play as soon as we leave.',
    todo: true,
  },
  {
    q: "What's the difference between standard and tournament cloth?",
    a: 'Standard woolen cloth is great for home play. Tournament worsted cloth is a tighter weave that plays faster and truer and lasts longer. <a href="/refelting-repair/">More on cloth</a>.',
  },
  {
    q: 'Should I recushion at the same time?',
    a: 'If your rubber is old, yes. The rails are already off for the refelt, so doing both at once costs less than two separate visits.',
  },
  {
    q: 'Is my old table worth fixing?',
    a: 'If it has real slate and a solid frame, usually yes. New cloth and cushions make an older table play like new for far less than a replacement.',
  },
];

export const pricing: Faq[] = [
  {
    q: 'How much does it cost to move a pool table?',
    a: 'Local moves start at [$___]. The final price depends on table size, stairs on either end and distance. Text us photos and both addresses for an exact number.',
    todo: true,
  },
  { q: 'Is the quote free?', a: 'Yes. Most jobs we can quote from photos without a visit.' },
  {
    q: 'How far ahead should I book?',
    a: "[Typical lead time.] If you're moving house, book as soon as you have a date.",
    todo: true,
  },
  { q: 'What forms of payment do you take?', a: '[Payment methods.]', todo: true },
];

export const buying: Faq[] = [
  {
    q: 'Does the price include delivery and setup?',
    a: '[Confirm: included, or added at local rates.]',
    todo: true,
  },
  {
    q: 'Found a used table online. Can you check it before I buy?',
    a: "[Confirm if offered.] Either way, we can move it from the seller's place and set it up at yours.",
    todo: true,
  },
];

export const faqGroups: FaqGroup[] = [
  { id: 'pricing', title: 'Pricing & booking', items: pricing },
  { id: 'moving', title: 'Moving', items: moving },
  { id: 'cloth', title: 'Cloth & repair', items: cloth },
  { id: 'buying', title: 'Buying a table', items: buying },
];
