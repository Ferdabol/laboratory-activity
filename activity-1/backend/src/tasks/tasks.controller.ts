import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.findAll();
  }

  @Post()
  createTask(@Body() body: { title: string; description: string }) {
    return this.tasksService.create(body.title, body.description);
  }
}

