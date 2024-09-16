
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


  async findUserById(id: number): Promise<User> { 
    return await this.usersRepository.findOne({ where: { id } });
  }

  


  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

   
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

 
   async update(id: number, updateData: Partial<User>): Promise<User> {
 
    await this.usersRepository.update(id, updateData);
   
    return this.findOne(id);
  }

  

  // async remove(id: number): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }
}
