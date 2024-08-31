import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShipsController } from './ships/ships.controller';
import { ShipsService } from './ships/ships.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ShipsModule} from './ships/ships.module';
import { Ship } from './ships/ships.entity';
import { PortsModule } from './ports/ports.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'postgres',
      username: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      database: 'postgres',
      synchronize: true,
      logging: true,
  }),
  TypeOrmModule.forFeature([Ship]),
  ShipsModule,
  PortsModule,
  UsersModule,],
  controllers: [AppController, ShipsController],
  providers: [AppService, ShipsService],
})
export class AppModule {}
