import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { TagService } from './tag.service';
import { Roles } from './../../role/roles.decorator';
import { TagDto } from './dtos/tag.dto';
import { TagsDto } from './dtos/tags.dto';

@Controller('tag')
@Roles('admin')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async getOrCreate(@Body() body: TagDto) {
    return this.tagService.findOrCreate(body);
  }

  @Post('array')
  async getOrCreates(@Body() body: TagsDto) {
    return this.tagService.findOrCreates(body);
  }

  @Get()
  async getAll() {
    return this.tagService.findAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.tagService.findById(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: TagDto) {
    return this.tagService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.tagService.delete(id);
  }
}
