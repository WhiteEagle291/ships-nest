// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/create-user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private usersService: UsersService,
    private readonly  jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { username } }); // Correct query
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // async loginOrCreateUser(createUserDto: CreateUserDto): Promise<any> {
  //   const { username, password, shipId } = createUserDto;
  //   let user = await this.usersService.findByUsername(username);

  //   if (!user) {
  //     user = await this.usersService.createUser(createUserDto);
  //   }

  //   const payload = { username: user.username, sub: user.id };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

  async login(loginDto: LoginDto): Promise<{ token: string; user: User }> {
    let user = await this.usersService.findByUsername(loginDto.username);

    if (!user) {
      const createUserDto: CreateUserDto = {
        username: loginDto.username,
        password: loginDto.password, // Consider hashing the password here
        // other user fields...
      };
      user = await this.usersService.create(createUserDto);
    }

    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);

    return { token, user };
  }

}
