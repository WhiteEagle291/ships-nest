
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PortsService } from './ports.service';
import { Port } from './port.entity';
import { CreatePortDto } from './create-port.dto';

@Controller('ports')
export class PortsController {
  constructor(private readonly portsService: PortsService) {}

  @Get()
  findAll() {
    return this.portsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Port> {
    return this.portsService.findOne(id);
  }

  @Post()
  create(@Body() createPortDto: CreatePortDto) {
    return this.portsService.create(createPortDto);
  }

  // @Put(':id')
  // update(@Param('id') id: number, @Body() portData: Partial<Port>): Promise<Port> {
  //   return this.portsService.update(id, portData);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: number): Promise<void> {
  //   return this.portsService.remove(id);
  // }
}
