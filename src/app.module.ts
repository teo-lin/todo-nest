import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './modules/task/task.module';
import { ListModule } from './modules/list/list.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseService } from './modules/database/database.service';

@Module({
  imports: [TaskModule, ListModule, UserModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
