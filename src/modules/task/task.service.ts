import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  createTask(createTaskDto: CreateTaskDto) {
    return createTaskDto;
  }

  retrieveTask(id: string) {
    return `This action returns a #${id} task`;
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task ${updateTaskDto}`;
  }

  deleteTask(id: string) {
    return `This action removes a #${id} task`;
  }

  completeTask(id: string) {
    return `This action completes a #${id} task`;
  }
}
