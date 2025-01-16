import { z } from 'zod';
import { TagSchema } from './../../tag/dtos/tag.dto';

export const ArticleSchema = z.object({
  title: z.string().min(1, 'title is required'),
  text: z.string().min(1, 'text is required'),
  category_id: z.number({ required_error: 'category_id is required' }).int().positive('category_id must be a positive integer'),
  tags: z.array(TagSchema)
});

export type Article = z.infer<typeof ArticleSchema>;

export class ArticleDto {
  static schema = ArticleSchema;
}
