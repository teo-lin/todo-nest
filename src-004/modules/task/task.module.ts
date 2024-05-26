import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, DatabaseService],
})
export class TaskModule {}
