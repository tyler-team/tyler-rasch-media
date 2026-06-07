import { type SchemaTypeDefinition } from 'sanity';
import { pressRelease } from './pressRelease';
import { blogPost } from './blogPost';

export const schemaTypes: SchemaTypeDefinition[] = [
  pressRelease,
  blogPost
];
