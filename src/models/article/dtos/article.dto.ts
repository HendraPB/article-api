import { z } from 'zod';

export const ArticleSchema = z.object({
  title: z.string().min(1, 'title is required'),
  text: z.string().min(1, 'text is required'),
  category_id: z.number({ required_error: 'category_id is required' }).int().positive('category_id must be a positive integer')
});

export type Article = z.infer<typeof ArticleSchema>;

export class ArticleDto {
  static schema = ArticleSchema;
}
