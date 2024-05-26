import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // MIDDLEWARE
  app.setGlobalPrefix('api');
  app.useGlobalFilters({
    catch: (exception, host) =>
      host.switchToHttp().getResponse().status(404).json({ message: 'Route not found' }),
  });

  // SERVER
  await app.listen(3000);
}
bootstrap();
