import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Logger.log(
    `Api Rodando na Porta http://localhost:${process.env.PORT ?? 3000}`,
    'Aplicação',
  );
  const config = new DocumentBuilder()
    .setTitle('Dotum Finac API')
    .setDescription('API para desafio tecnico backend Dotum')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, documentFactory());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
