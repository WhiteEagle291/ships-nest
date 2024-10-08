
import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard'; 
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/create-user-dto';
import { LoginDto } from './login.dto';
import { ShipsService } from 'src/ships/ships.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly shipService: ShipsService 
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { token, user } = await this.authService.login(loginDto);
    
    //fetchovanje brodova i slanje u response
    const ships = await this.shipService.getAllShips();

    return {
      message: 'Login successful',
      access_token: token,
      user,
      ships
    };
  }
  

  @Get('test')
  @UseGuards(JwtAuthGuard) // test funkcija
  getTest() {
    return { message: 'Test endpoint works!' };
  }
}
