import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ShipsService } from './ships.service';
import { Ship } from './ships.entity';
import { CreateShipDto } from './create-ship.dto';

@Controller('ships')
export class ShipsController {
  constructor(private shipsService: ShipsService) {}

  @Get()
  findAll() {
    return this.shipsService.findAll();
  }

  @Post()
create(@Body() createShipDto: CreateShipDto) {
  console.log("Received createShipDto:", createShipDto); // Debugging log
  return this.shipsService.addShip(createShipDto);
}

@Post(':id/addUser')
async addUserToCrew(
  @Param('id') id: number,
  @Body('username') username: string,
) {
  const ship = await this.shipsService.findOne(id);
  if (!ship) {
    throw new NotFoundException('Ship not found');
  }

  ship.crew.push(username);
  await this.shipsService.updateShip(id, ship);
  return ship;
}



  @Get(':id')
  async getShipById(@Param('id') id: number): Promise<Ship> {
    return this.shipsService.findShipById(id);
  }

  // @Put(':id')
  // async updateShip(
  //   @Param('id') id: number,
  //   @Body() updateData: Partial<Ship>,
  // ): Promise<Ship> {
  //   return this.shipsService.updateShip(id, updateData);
  // }

  @Delete(':id')
  async deleteShip(@Param('id') id: number): Promise<void> {
    return this.shipsService.deleteShip(id);
  }
}
