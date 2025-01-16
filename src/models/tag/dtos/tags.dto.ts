import { z } from 'zod';
import { TagSchema } from './tag.dto';

export const TagsSchema = z.object({
  tags: z.array(TagSchema)
});

export type Tags = z.infer<typeof TagsSchema>;

export class TagsDto {
  static schema = TagsSchema;
}
