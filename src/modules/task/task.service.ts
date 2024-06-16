import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DatabaseService } from '../database/database.service';
import { Task } from './entities/task.entity';
import { Database } from '../interfaces';

@Injectable()
export class TaskService {
  createTask(taskData: CreateTaskDto): Task {
    const data: Database = DatabaseService.getData();
    const nextTaskId: string = `T${1 + Number(data.lastTaskId.slice(1))}`;
    const task: Task = { taskId: nextTaskId, ...taskData };

    data.tasks.push(task);
    data.lastTaskId = nextTaskId;
    DatabaseService.setData(data);

    return task;
  }

  retrieveTask(taskId: string): Task {
    const data: Database = DatabaseService.getData();

    const task: Task | undefined = data.tasks.find((task: Task) => task.taskId === taskId);
    if (!task) throw new NotFoundException(`Task not found`);
    else return task;
  }

  updateTask(taskId: string, taskData: UpdateTaskDto): Task {
    const data: Database = DatabaseService.getData();
    const taskIndex: number = data.tasks.findIndex((task: any) => task.taskId === taskId);
    if (taskIndex === -1) throw new NotFoundException(`Task not found`);
    const task: Task = { ...data.tasks[taskIndex], ...taskData };

    data.tasks[taskIndex] = task;
    DatabaseService.setData(data);

    return task;
  }

  deleteTask(taskId: string): void {
    const data: Database = DatabaseService.getData();
    const totalRecords = data.tasks.length;

    data.tasks = data.tasks.filter((task: Task) => task.taskId !== taskId);
    if (totalRecords === data.tasks.length) throw new NotFoundException(`Task not found`);
    else DatabaseService.setData(data);
  }

  completeTask(taskId: string): Task {
    const data: Database = DatabaseService.getData();
    const taskIndex: number = data.tasks.findIndex((task: Task) => task.taskId === taskId);

    if (taskIndex === -1) throw new NotFoundException(`Task not found`);
    else {
      data.tasks[taskIndex].isComplete = true;
      DatabaseService.setData(data);
      return data.tasks[taskIndex];
    }
  }
}
