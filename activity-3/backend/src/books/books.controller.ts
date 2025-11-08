import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new book', description: 'Creates a new book in the database' })
  @ApiResponse({ status: 201, description: 'The book has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all books', description: 'Retrieves all books from the database' })
  @ApiResponse({ status: 200, description: 'Returns an array of all books.' })
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID', description: 'Retrieves a single book by its ID' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the book', type: String })
  @ApiResponse({ status: 200, description: 'Returns the book with the specified ID.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a book', description: 'Updates an existing book by its ID' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the book to update', type: String })
  @ApiResponse({ status: 200, description: 'The book has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book', description: 'Deletes a book from the database by its ID' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the book to delete', type: String })
  @ApiResponse({ status: 200, description: 'The book has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
