// src/ports/ports.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Port } from './port.entity';
import { CreatePortDto } from './create-port.dto';

@Injectable()
export class PortsService {
  constructor(
    @InjectRepository(Port)
    private portsRepository: Repository<Port>,
  ) {}

  findAll() {
    return this.portsRepository.find();
  }

  findOne(id: number): Promise<Port> {
    return this.portsRepository.findOne({ where: { id }, relations: ['ships'] });
  }

  create(createPortDto: CreatePortDto) {
    const port = this.portsRepository.create(createPortDto);
    return this.portsRepository.save(port);
  }

  // async update(id: number, updateData: Partial<Port>): Promise<Port> {
  //   await this.portsRepository.update(id, updateData);
  //   return this.findOne(id);
  // }

  // async remove(id: number): Promise<void> {
  //   await this.portsRepository.delete(id);
  // }
}
