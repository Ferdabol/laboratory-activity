import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiBody({ type: CreateAuthorDto })
  create(@Body() author: CreateAuthorDto) {
    return this.authorsService.create(author);
  }

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ type: CreateAuthorDto })
  update(@Param('id') id: string, @Body() author: CreateAuthorDto) {
    return this.authorsService.update(id, author);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorsService.remove(id);
  }
}
