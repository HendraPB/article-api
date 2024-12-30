import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';
import { Article } from './dtos/article.dto';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user_id: number, dto: Article) {
    return this.prisma.article.create({
      data: {
        title: dto.title,
        text: dto.text,
        user: {
          connect: { id: user_id }
        },
        category: {
          connect: { id: dto.category_id }
        }
      }
    });
  }

  async findAll(user_id: number) {
    return this.prisma.article.findMany({
      where: { user_id: user_id }
    });
  }

  async findById(user_id: number, id: number) {
    const article = await this.prisma.article.findUnique({
      where: {
        id: id,
        user_id: user_id
      }
    });

    if (!article) {
      throw new NotFoundException('article not found');
    }

    return article;
  }

  async update(user_id: number, id: number, dto: Article) {
    await this.findById(id, user_id);

    return this.prisma.article.update({
      where: { id: id },
      data: {
        title: dto.title,
        text: dto.text,
        category: {
          connect: { id: dto.category_id }
        }
      }
    });
  }

  async delete(user_id: number, id: number) {
    await this.findById(id, user_id);

    return this.prisma.article.delete({
      where: { id: id }
    });
  }
}
