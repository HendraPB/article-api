import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';
import { Article } from './dtos/article.dto';
import { TagService } from './../tag/tag.service';

@Injectable()
export class ArticleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tagService: TagService
  ) {}

  async create(user_id: number, dto: Article) {
    const tags = await this.tagService.findOrCreates(dto);

    return this.prisma.article.create({
      data: {
        title: dto.title,
        text: dto.text,
        user: {
          connect: { id: user_id }
        },
        category: {
          connect: { id: dto.category_id }
        },
        tags: {
          connect: tags.map((tag) => ({ id: tag.id }))
        }
      },
      include: {
        category: true,
        tags: true
      }
    });
  }

  async findAll(user_id: number) {
    return this.prisma.article.findMany({
      where: { user_id: user_id },
      include: {
        category: true,
        tags: true
      }
    });
  }

  async findById(user_id: number, id: number) {
    const article = await this.prisma.article.findUnique({
      where: {
        id: id,
        user_id: user_id
      },
      include: {
        category: true,
        tags: true
      }
    });

    if (!article) {
      throw new NotFoundException('article not found');
    }

    return article;
  }

  async update(user_id: number, id: number, dto: Article) {
    await this.findById(user_id, id);

    const tags = await this.tagService.findOrCreates(dto);

    return this.prisma.article.update({
      where: { id: id },
      data: {
        title: dto.title,
        text: dto.text,
        category: {
          connect: { id: dto.category_id }
        },
        tags: {
          set: tags.map((tag) => ({ id: tag.id }))
        }
      },
      include: {
        category: true,
        tags: true
      }
    });
  }

  async delete(user_id: number, id: number) {
    await this.findById(user_id, id);

    return this.prisma.article.delete({
      where: { id: id },
      include: {
        category: true,
        tags: true
      }
    });
  }
}
