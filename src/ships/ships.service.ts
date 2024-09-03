import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ship } from './ships.entity';
import { Port } from '../ports/port.entity'; // Import the Port entity
import { CreateShipDto } from './create-ship.dto';

@Injectable()
export class ShipsService {
  constructor(
    @InjectRepository(Ship)
    private shipRepository: Repository<Ship>,

    @InjectRepository(Port) // Inject the Port repository
    private portRepository: Repository<Port>,
  ) {}

  findAll() {
    return this.shipRepository.find({ relations: ['port'] });
  }

  async addShip(createShipDto: CreateShipDto): Promise<Ship> {
    const { name, type, crew, portId } = createShipDto; // Destructure portId
  
    console.log(`Received portId: ${portId}`); // Debugging log
  
    // Find the port by ID
    const port = await this.portRepository.findOne({ where: { id: portId } });
  
    if (!port) {
      throw new Error('Port not found');
    }
  
    // Create and save the ship with the port reference
    const ship = this.shipRepository.create({
      name,
      type,
      crew: Array.isArray(crew) ? crew : [crew],
      port,
    });
  
    return this.shipRepository.save(ship);
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

  async updateShip(id: number, updateData: Partial<Ship>): Promise<Ship> {
    await this.shipRepository.update(id, updateData);
    return this.findShipById(id);
  }

  async deleteShip(id: number): Promise<void> {
    await this.shipRepository.delete(id);
  }
}
