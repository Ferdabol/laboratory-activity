import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend
  app.enableCors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('API for managing blog posts and comments')
    .setVersion('1.0')
    .addTag('Blogs')
    .addTag('Comments')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('🚀 Server running at http://localhost:3000');
  console.log('📘 Swagger Docs available at http://localhost:3000/api');
}
bootstrap();


