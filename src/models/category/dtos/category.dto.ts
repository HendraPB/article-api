import { z } from 'zod';

export const CategorySchema = z.object({
  name: z.string()
});

export type Category = z.infer<typeof CategorySchema>;

export class CategoryDto {
  static schema = CategorySchema;
}
