import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category', description: 'Creates a new category in the database' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({ status: 201, description: 'The category has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories', description: 'Retrieves all categories from the database' })
  @ApiResponse({ status: 200, description: 'Returns an array of all categories.' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by ID', description: 'Retrieves a single category by its ID' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the category', type: String })
  @ApiResponse({ status: 200, description: 'Returns the category with the specified ID.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a category', description: 'Updates an existing category by its ID' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the category to update', type: String })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({ status: 200, description: 'The category has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category', description: 'Deletes a category from the database by its ID' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the category to delete', type: String })
  @ApiResponse({ status: 200, description: 'The category has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
