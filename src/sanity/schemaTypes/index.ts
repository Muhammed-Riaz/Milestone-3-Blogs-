import { type SchemaTypeDefinition } from 'sanity'
import { blogSchema } from './blog'
import { authorSchema } from './author'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [  blogSchema ,authorSchema ]
}

