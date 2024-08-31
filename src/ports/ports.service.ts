// src/ports/ports.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Port } from './port.entity';

@Injectable()
export class PortsService {
  constructor(
    @InjectRepository(Port)
    private portsRepository: Repository<Port>,
  ) {}

  findAll(): Promise<Port[]> {
    return this.portsRepository.find({ relations: ['ships'] });
  }

  findOne(id: number): Promise<Port> {
    return this.portsRepository.findOne({ where: { id }, relations: ['ships'] });
  }

  create(port: Partial<Port>): Promise<Port> {
    const newPort = this.portsRepository.create(port);
    return this.portsRepository.save(newPort);
  }

  async update(id: number, updateData: Partial<Port>): Promise<Port> {
    await this.portsRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.portsRepository.delete(id);
  }
}
