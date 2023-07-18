import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  UseGuards
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @UseGuards(AuthGuard)
  @Post('/verify-jwt')
  verifyJWT() {
    return this.authService.verifyJWT();
  }
}
