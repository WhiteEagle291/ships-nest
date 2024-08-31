// ships.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ShipsService } from './ships.service';
import { Ship } from './ships.entity';
import { CreateShipDto } from './create-ship.dto';

@Controller('ships')
export class ShipsController {
  constructor(private shipsService: ShipsService) {}

  @Post()
  async createShip(@Body() createShipDto: CreateShipDto): Promise<Ship> {
    console.log('Controller received:', createShipDto);
    return this.shipsService.addShip(createShipDto);
  }

  @Get()
  async getAllShips(): Promise<Ship[]> {
    return this.shipsService.getAllShips();
  }

  @Get(':id')
  async getShipById(@Param('id') id: number): Promise<Ship> {
    return this.shipsService.findShipById(id);
  }

  @Put(':id')
  async updateShip(
    @Param('id') id: number,
    @Body() updateData: Partial<Ship>,
  ): Promise<Ship> {
    return this.shipsService.updateShip(id, updateData);
  }

  @Delete(':id')
  async deleteShip(@Param('id') id: number): Promise<void> {
    return this.shipsService.deleteShip(id);
  }

  @Post('/add-test-ship')
  async addTestShip(): Promise<Ship> {
    // Hardcoded ship data for testing
    return this.shipsService.createShip('Black Pearl', 'Pirate Ship', ['Jack Sparrow', 'Will Turner', 'Elizabeth Swann']);
  }
}
