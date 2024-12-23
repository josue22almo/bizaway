
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.forRoot());

  const config = new DocumentBuilder()
    .setTitle('Bizaway API')
    .setDescription('The Bizaway API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  app.useGlobalPipes(new ValidationPipe());


  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
  Logger.log(
    `📚 Swagger documentation is available at: http://localhost:${port}/api`
  );
}

bootstrap();
