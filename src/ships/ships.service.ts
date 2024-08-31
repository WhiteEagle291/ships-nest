import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ship } from './ships.entity';
import { CreateShipDto } from './create-ship.dto';

@Injectable()
export class ShipsService {
  constructor(
    @InjectRepository(Ship)
    private shipRepository: Repository<Ship>,
  ) {}
  // Service methods here

  async addShip(createShipDto: CreateShipDto): Promise<Ship> {
    console.log('Received DTO:', createShipDto);
  
    const { name, type, crew } = createShipDto;
    console.log('Parsed Values:', { name, type, crew });
  
    const ship = this.shipRepository.create({
      name,
      type,
      crew: Array.isArray(crew) ? crew : [crew] // Ensure this is an array
    });
  
    console.log('Constructed Ship:', ship);
    const savedShip = await this.shipRepository.save(ship);
    console.log('Saved Ship:', savedShip);
  
    return savedShip;
  }
  
  
  async createShip(name: string, type: string, crew: string[]): Promise<Ship> {
    const newShip = this.shipRepository.create({ name, type, crew });
    return this.shipRepository.save(newShip);
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