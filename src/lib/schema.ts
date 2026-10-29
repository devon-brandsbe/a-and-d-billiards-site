import type { Faq } from '@/data/faqs';
import { plainText } from './todo';

/** FAQPage structured data. Unfinished (todo) answers are left out. */
export function faqSchema(items: Faq[]) {
  const ready = items.filter((f) => !f.todo);
  if (!ready.length) return [];
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: ready.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: plainText(f.a) },
      })),
    },
  ];
}

export function serviceSchema(name: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: { '@id': new URL('/#business', url).href },
    areaServed: 'Cleveland and neighboring areas, OH',
  };
}
