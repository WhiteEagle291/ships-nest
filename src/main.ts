import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ShipsService } from './ships/ships.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Enable CORS
    app.enableCors({
      origin: 'http://localhost:4200', // Allow your Angular app's origin
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

  // const shipsService = app.get(ShipsService);
  // await shipsService.createTestShip();  // Add a test ship to the database
  //app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
