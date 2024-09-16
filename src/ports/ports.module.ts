
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortsService } from './ports.service';
import { PortsController } from './ports.controller';
import { Port } from './port.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Port]), 
  ],
  providers: [PortsService],
  controllers: [PortsController],
  exports: [PortsService, TypeOrmModule],
})
export class PortsModule {}
