import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImage } from './sanity.types';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}

