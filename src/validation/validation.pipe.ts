import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ZodSchema, ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    if (!metatype || typeof metatype !== 'function') {
      return value;
    }

    const schema: ZodSchema | undefined = (metatype as any).schema;
    if (!schema) {
      return value;
    }

    try {
      const validatedValue = schema.parse(value);

      await this.checkIdsExist(validatedValue);

      return validatedValue;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(error.errors.map((e) => e.message).join(', '));
      }
      throw new BadRequestException(error.message);
    }
  }

  private async checkIdsExist(validatedData: any) {
    for (const [key, value] of Object.entries(validatedData)) {
      if (key.endsWith('_id') && typeof value === 'number') {
        const modelName = key.replace('_id', '');

        if (this.prisma[modelName]) {
          const recordExists = await this.prisma[modelName].findUnique({
            where: { id: value }
          });

          if (!recordExists) {
            throw new BadRequestException(`${modelName} with id ${value} does not exist`);
          }
        } else {
          throw new BadRequestException(`invalid model name for ${key}`);
        }
      }
    }
  }
}
