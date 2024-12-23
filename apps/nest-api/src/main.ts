
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.forRoot('api'));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  app.useGlobalPipes(new ValidationPipe());
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
