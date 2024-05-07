import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [ListController],
  providers: [ListService, DatabaseService],
})
export class ListModule {}
