import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './../../prisma/prisma.service';
import { Category } from './dtos/category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: Category) {
    return this.prisma.category.create({
      data: { name: dto.name }
    });
  }

  async findAll() {
    return this.prisma.category.findMany({
      include: {
        _count: {
          select: { articles: true }
        }
      }
    });
  }

  async findById(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id: id },
      include: {
        _count: {
          select: { articles: true }
        }
      }
    });

    if (!category) {
      throw new NotFoundException('category not found');
    }

    return category;
  }

  async update(id: number, dto: Category) {
    await this.findById(id);

    return this.prisma.category.update({
      where: { id: id },
      data: { name: dto.name }
    });
  }

  async delete(id: number) {
    await this.findById(id);

    return this.prisma.category.delete({
      where: { id: id }
    });
  }
}
