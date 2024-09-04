// users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity'; // Import your User entity
import { Ship } from 'src/ships/ships.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([User,Ship]), // Register the User entity here
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService,TypeOrmModule],
})
export class UsersModule {}
