import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './modules/database/database.service';
import { UserModule } from './modules/user/user.module';
import { ListModule } from './modules/list/list.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [UserModule, ListModule, TaskModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
