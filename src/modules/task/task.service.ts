import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DatabaseService } from '../database/database.service';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(private readonly databaseService: DatabaseService) {}

  createTask(createTaskDto: CreateTaskDto) {
    const data = this.databaseService.getData();
    const nextTaskId = `T${1 + Number(data.lastTaskId.slice(1))}`;
    const newTask = { taskId: nextTaskId, ...createTaskDto };
    data.tasks.push(newTask);
    data.lastTaskId = nextTaskId;
    this.databaseService.setData(data);
    return newTask;
  }

  retrieveTask(taskId: string) {
    const data = this.databaseService.getData();
    const task = data.tasks.find((task: Task) => task.taskId === taskId);
    if (!task) throw new Error('Task not found');
    return task;
  }

  updateTask(taskId: string, updateTaskDto: UpdateTaskDto) {
    const data = this.databaseService.getData();
    const taskIndex = data.tasks.findIndex((task: Task) => task.taskId === taskId);
    if (taskIndex === -1) throw new Error('Task not found');
    data.tasks[taskIndex] = { ...data.tasks[taskIndex], ...updateTaskDto };
    this.databaseService.setData(data);
    const task = data.tasks[taskIndex];
    return task;
  }

  deleteTask(taskId: string) {
    const data = this.databaseService.getData();
    data.tasks = data.tasks.filter((task: Task) => task.taskId !== taskId);
    this.databaseService.setData(data);
    return { message: 'Task deleted successfully' };
  }

  completeTask(taskId: string) {
    const data = this.databaseService.getData();
    const taskIndex = data.tasks.findIndex((task: Task) => task.taskId === taskId);
    if (taskIndex === -1) throw new Error('Task not found');
    data.tasks[taskIndex] = { ...data.tasks[taskIndex], isComplete: true };
    this.databaseService.setData(data);
    const task = data.tasks[taskIndex];
    return task;
  }
}
