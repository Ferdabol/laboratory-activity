import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Books') // ✅ Shows in Swagger UI
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiBody({ type: CreateBookDto })
  create(@Body() book: CreateBookDto) {
    return this.booksService.create(book);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ type: CreateBookDto })
  update(@Param('id') id: string, @Body() book: CreateBookDto) {
    return this.booksService.update(id, book);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
 