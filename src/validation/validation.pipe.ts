import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    if (!metatype || typeof metatype !== 'function') {
      return value;
    }

    const schema: ZodSchema | undefined = (metatype as any).schema;
    if (!schema) {
      return value;
    }

    try {
      return schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(
          error.errors.map((e) => e.message).join(', '),
        );
      }
      throw new BadRequestException('Validation failed');
    }
  }
}
