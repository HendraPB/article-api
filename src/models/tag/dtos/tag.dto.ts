import { z } from 'zod';

export const TagSchema = z.object({
  name: z.string().min(1, 'name is required')
});

export type Tag = z.infer<typeof TagSchema>;

export class TagDto {
  static schema = TagSchema;
}
