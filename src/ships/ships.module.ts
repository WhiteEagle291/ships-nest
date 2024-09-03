// src/ships/ships.module.ts

import { Module } from '@nestjs/common';
import { ShipsService } from './ships.service';
import { ShipsController } from './ships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ship } from './ships.entity';
import { PortsModule } from 'src/ports/ports.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ship]),
  PortsModule], // Import the TypeORM module and register the Ship entity
  controllers: [ShipsController], // Register the controller
  providers: [ShipsService], // Register the service
  exports: [ShipsService], // Export the service if needed by other modules
})
export class ShipsModule {}
