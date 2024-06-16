import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Get('task/:id')
  retrieveTask(@Param('id') id: string) {
    return this.taskService.retrieveTask(id);
  }

  @Put('task/:id')
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Delete('task/:id')
  deleteTask(@Param('id') id: string) {
    this.taskService.deleteTask(id);
    return { message: 'Task deleted successfully' };
  }

  @Patch('task/:id/complete')
  completeTask(@Param('id') id: string) {
    return this.taskService.completeTask(id);
  }
}
