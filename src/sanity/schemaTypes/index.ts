import { type SchemaTypeDefinition } from 'sanity';
import { pressRelease } from './pressRelease';
import { blogPost } from './blogPost';
import { dossier } from './dossier';
import { siteMetrics } from './siteMetrics';

export const schemaTypes: SchemaTypeDefinition[] = [
  pressRelease,
  blogPost,
  dossier,
  siteMetrics,
];
