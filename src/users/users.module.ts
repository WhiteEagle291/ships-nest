// users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { Ship } from 'src/ships/ships.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([User,Ship]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService,TypeOrmModule],
})
export class UsersModule {}
