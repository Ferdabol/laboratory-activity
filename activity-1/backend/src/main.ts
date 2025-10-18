import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.enableCors({
    origin: 'http://localhost:5173', 
    methods: 'GET,POST,PATCH,DELETE',
  });


  const config = new DocumentBuilder()
    .setTitle('To-Do List API')
    .setDescription('A simple NestJS REST API for managing tasks using MongoDB.')
    .setVersion('1.0')
    .addTag('tasks')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('🚀 Server running at http://localhost:3000');
  console.log('📘 Swagger Docs available at http://localhost:3000/api');
}
bootstrap();


