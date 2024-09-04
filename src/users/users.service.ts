// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
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


  async findUserById(id: number): Promise<User> { // Add this method
    return await this.usersRepository.findOne({ where: { id } });
  }

  

  // Method to find a user by ID
  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

    // Method to find a user by username
    async findByUsername(username: string): Promise<User | undefined> {
      return this.usersRepository.findOne({ where: { username } });
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
      const user = this.usersRepository.create(createUserDto);
      return this.usersRepository.save(user);
    }

  
    async create(createUserDto: CreateUserDto): Promise<User> {
      const newUser = this.usersRepository.create(createUserDto);
      return this.usersRepository.save(newUser);
    }

   // Update method that correctly calls findOne after the update
   async update(id: number, updateData: Partial<User>): Promise<User> {
    // Perform the update operation
    await this.usersRepository.update(id, updateData);

    // Retrieve and return the updated user using the updated findOne method
    return this.findOne(id);
  }

  

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
