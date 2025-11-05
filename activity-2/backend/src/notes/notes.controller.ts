import { Controller, Get, Post, Put, Delete, Body, Param, Query, BadRequestException } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  findAll(@Query('username') username: string) {
    if (!username) throw new BadRequestException('username is required');
    return this.notesService.findAll(username);
  }

  @Post()
  create(@Body() dto: CreateNoteDto) {
    const { username, title, content } = dto;
    if (!username) throw new BadRequestException('username is required');
    return this.notesService.create(username, { title, content });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNoteDto) {
    const { username, title, content } = dto;
    if (!username) throw new BadRequestException('username is required');
    return this.notesService.update(id, username, { title, content });
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Query('username') username: string) {
    if (!username) throw new BadRequestException('username is required');
    return this.notesService.delete(id, username);
  }
}