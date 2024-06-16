import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseService } from './modules/database/database.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // DATABASE
  DatabaseService.init();

  // MIDDLEWARE
  app.setGlobalPrefix('api');

  // SERVER
  await app.listen(3000);
}
bootstrap();
