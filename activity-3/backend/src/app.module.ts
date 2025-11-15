import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { CategoryModule } from './categories/category.module';

@Module({
  imports: [BooksModule,AuthorsModule,CategoryModule],
  
  
  
})
export class AppModule {}
