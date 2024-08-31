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
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

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
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env', // This makes ConfigService available globally
  }),
  UsersModule,
  AuthModule,],
  controllers: [AppController, ShipsController],
  providers: [AppService, ShipsService],
})
export class AppModule {}
