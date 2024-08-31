// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user-dto';
import { Ship } from 'src/ships/ships.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Ship)
    private readonly shipRepository: Repository<Ship>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['ship'] });
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id }, relations: ['ship'] });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { shipId, ...userData } = createUserDto;

    // Check if shipId is provided and fetch the ship
    let ship: Ship | undefined;
    if (shipId) {
      ship = await this.shipRepository.findOneBy({ id: shipId });
    }

    // Create user
    const user = this.usersRepository.create({ ...userData, ship });
    return this.usersRepository.save(user);
  }

  async update(id: number, updateData: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, updateData);
    return this.findOne(id);
  }

  

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
