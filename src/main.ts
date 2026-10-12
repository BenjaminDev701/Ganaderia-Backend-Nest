import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // descarta campos que no estén en el DTO
      forbidNonWhitelisted: true, // lanza error si envían propiedades extra
      transform: true, // transforma los tipos según el DTO
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
