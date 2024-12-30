import { z } from 'zod';

export const CategorySchema = z.object({
  name: z.string().min(1, 'name is required')
});

export type Category = z.infer<typeof CategorySchema>;

export class CategoryDto {
  static schema = CategorySchema;
}
