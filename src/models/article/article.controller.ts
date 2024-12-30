import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Roles } from './../../role/roles.decorator';
import { Auth } from './../../auth/auth.decorator';
import { ArticleDto } from './dtos/article.dto';

@Controller('article')
@Roles('user')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async create(@Auth('id') user_id: number, @Body() body: ArticleDto) {
    return this.articleService.create(user_id, body);
  }

  @Get()
  async getAll(@Auth('id') user_id: number) {
    return this.articleService.findAll(user_id);
  }

  @Get(':id')
  async getById(@Auth('id') user_id: number, @Param('id', ParseIntPipe) id: number) {
    return this.articleService.findById(user_id, id);
  }

  @Put(':id')
  async update(@Auth('id') user_id: number, @Param('id', ParseIntPipe) id: number, @Body() body: ArticleDto) {
    return this.articleService.update(user_id, id, body);
  }

  @Delete(':id')
  async delete(@Auth('id') user_id: number, @Param('id', ParseIntPipe) id: number) {
    return this.articleService.delete(user_id, id);
  }
}
