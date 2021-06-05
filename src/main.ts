import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Security configuration
  app.enableCors({
    origin: ['http://localhost:8080'],
  });
  // Class validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    }),
  );
  // Open API documentation
  const config = new DocumentBuilder()
    .setTitle('Bono Facil API')
    .setDescription('Bono Facil RESTful API made with NestJs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Initialize app on port 3000
  await app.listen(3000);
}

bootstrap();
