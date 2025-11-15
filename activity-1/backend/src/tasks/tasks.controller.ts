import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.schema';
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiOkResponse({ description: 'List of tasks', type: [Task] })
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a task' })
  @ApiBody({ type: CreateTaskDto })
  @ApiCreatedResponse({ description: 'Task created', type: Task })
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Patch(':id/toggle')
  @ApiOperation({ summary: 'Toggle task completion' })
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ description: 'Toggled task', type: Task })
  toggle(@Param('id') id: string): Promise<Task> {
    return this.tasksService.toggle(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateTaskDto })
  @ApiOkResponse({ description: 'Updated task', type: Task })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ description: 'Deleted task', type: Task })
  remove(@Param('id') id: string): Promise<Task> {
    return this.tasksService.remove(id);
  }
}
