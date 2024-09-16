import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ship } from './ships.entity';
import { Port } from '../ports/port.entity'; // Import the Port entity
import { CreateShipDto } from './create-ship.dto';
import { User } from 'src/users/user.entity';
import { CreateUserDto } from 'src/users/create-user-dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ShipsService {
  constructor(
    @InjectRepository(Ship)
    private shipRepository: Repository<Ship>,

    @InjectRepository(Port) 
    private portRepository: Repository<Port>,

    private readonly usersService: UsersService, 
  ) {}

   //findAll uzima id luke i filtrira brodove za taj id
   findAll(portId?: number) {
    const query = this.shipRepository.createQueryBuilder('ship')
      .leftJoinAndSelect('ship.port', 'port');

    if (portId) {
      query.where('port.id = :portId', { portId });
    }

    return query.getMany(); 
  }

  async addShip(createShipDto: CreateShipDto): Promise<Ship> {
    const { name, type, crew, portId } = createShipDto; 
  
    console.log(`Received portId: ${portId}`); 
  
   
    const port = await this.portRepository.findOne({ where: { id: portId } });
  
    if (!port) {
      throw new Error('Port not found');
    }
  

    const ship = this.shipRepository.create({
      name,
      type,
      crew: Array.isArray(crew) ? crew : [crew],
      port,
    });
  
    return this.shipRepository.save(ship);
  }

  async addUserToCrew(shipId: number, userId: number): Promise<void> {
    const ship = await this.shipRepository.findOne({ where: { id: shipId } });
    const user = await this.usersService.findUserById(userId);

    if (ship && user) {
      if (!ship.crew.includes(user.username)) {
        ship.crew.push(user.username);
        await this.shipRepository.save(ship);
      }
    }
  }



  create(createShipDto: CreateShipDto) {
    const ship = this.shipRepository.create(createShipDto);
    return this.shipRepository.save(ship);
  }

  async getAllShips(): Promise<Ship[]> {
    return this.shipRepository.find();
  }

  async findShipById(id: number): Promise<Ship> {
    return this.shipRepository.findOne({ where: { id } });
  }

  async findOne(id: number): Promise<Ship> {
    return await this.shipRepository.findOneBy({ id });
  }

  async updateShip(id: number, updateShipDto: Partial<CreateShipDto>): Promise<Ship> {
    const ship = await this.shipRepository.findOne({ where: { id } });
    if (!ship) {
      throw new NotFoundException(`Ship with ID ${id} not found`);
    }
  
    if (updateShipDto.name) {
      ship.name = updateShipDto.name;
    }
    if (updateShipDto.type) {
      ship.type = updateShipDto.type;
    }
    if (updateShipDto.crew) {
      ship.crew = Array.isArray(updateShipDto.crew) ? updateShipDto.crew : [updateShipDto.crew];
    }
    if (updateShipDto.portId) {
      const port = await this.portRepository.findOne({ where: { id: updateShipDto.portId } });
      if (port) {
        ship.port = port;
      }
    }
  
    await this.shipRepository.save(ship);
    return ship;
  }


  async deleteShip(id: number): Promise<void> {
    await this.shipRepository.delete(id);
  }
}
