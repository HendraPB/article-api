import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TagModule } from './../tag/tag.module';

@Module({
  imports: [TagModule],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
