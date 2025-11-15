import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new author', description: 'Creates a new author in the database' })
  @ApiBody({ type: CreateAuthorDto })
  @ApiResponse({ status: 201, description: 'The author has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() author: CreateAuthorDto) {
    return this.authorsService.create(author);
  }

  @Get()
  @ApiOperation({ summary: 'Get all authors', description: 'Retrieves all authors from the database' })
  @ApiResponse({ status: 200, description: 'Returns an array of all authors.' })
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an author by ID', description: 'Retrieves a single author by their ID' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the author', type: String })
  @ApiResponse({ status: 200, description: 'Returns the author with the specified ID.' })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an author', description: 'Updates an existing author by their ID' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the author to update', type: String })
  @ApiBody({ type: UpdateAuthorDto })
  @ApiResponse({ status: 200, description: 'The author has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  update(@Param('id') id: string, @Body() author: UpdateAuthorDto) {
    return this.authorsService.update(id, author);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an author', description: 'Deletes an author from the database by their ID' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the author to delete', type: String })
  @ApiResponse({ status: 200, description: 'The author has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  remove(@Param('id') id: string) {
    return this.authorsService.remove(id);
  }
}
