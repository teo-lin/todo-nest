import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

// inspiration from https://stackoverflow.com/a/70958181
describe('AppModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    expect(module).toBeDefined();
  });

  it('should compile', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .useMocker(createMock)
      .compile();

    expect(module).toBeDefined();

    await module.close();
  });
});
