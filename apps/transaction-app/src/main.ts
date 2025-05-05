import { NestFactory } from '@nestjs/core';
import { TransactionAppModule } from './transaction-app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(TransactionAppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true, }));


  const config = new DocumentBuilder()
    .setTitle('transaction API')
    .setDescription('transaction API collection')
    .setVersion('1.0')
    .addTag('transaction')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.port ?? 4002);
}
bootstrap();
