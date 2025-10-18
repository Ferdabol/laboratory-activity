import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(title: string, description: string) {
    const newTask = new this.taskModel({ title, description });
    return newTask.save();
  }

  async findAll() {
    return this.taskModel.find().exec();
  }
}

