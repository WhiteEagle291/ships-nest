// ports.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortsService } from './ports.service';
import { PortsController } from './ports.controller';
import { Port } from './port.entity'; // Import your Port entity

@Module({
  imports: [
    TypeOrmModule.forFeature([Port]), // Register the Port entity here
  ],
  providers: [PortsService],
  controllers: [PortsController],
})
export class PortsModule {}
