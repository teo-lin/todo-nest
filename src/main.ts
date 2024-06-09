import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // MIDDLEWARE
  app.setGlobalPrefix('api');

  // SERVER
  await app.listen(3000);
}
bootstrap();
