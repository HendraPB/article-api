import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';
import { Tag } from './dtos/tag.dto';
import { Tags } from './dtos/tags.dto';

@Injectable()
export class TagService {
  constructor(private readonly prisma: PrismaService) {}

  async findOrCreate(dto: Tag) {
    return this.prisma.tag.upsert({
      where: { name: dto.name },
      update: {},
      create: { name: dto.name }
    });
  }

  async findOrCreates(dto: Tags) {
    return Promise.all(
      dto.tags.map(async (tag) => {
        return this.prisma.tag.upsert({
          where: { name: tag.name },
          update: {},
          create: { name: tag.name }
        });
      })
    );
  }

  async findAll() {
    return this.prisma.tag.findMany({
      include: {
        _count: {
          select: { articles: true }
        }
      }
    });
  }

  async findById(id: number) {
    const tag = await this.prisma.tag.findUnique({
      where: { id: id },
      include: {
        _count: {
          select: { articles: true }
        }
      }
    });

    if (!tag) {
      throw new NotFoundException('tag not found');
    }

    return tag;
  }

  async update(id: number, dto: Tag) {
    await this.findById(id);

    return this.prisma.tag.update({
      where: { id: id },
      data: { name: dto.name }
    });
  }

  async delete(id: number) {
    await this.findById(id);

    return this.prisma.tag.delete({
      where: { id: id }
    });
  }
}
