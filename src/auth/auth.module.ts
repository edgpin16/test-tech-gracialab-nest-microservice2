import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([ User, Role ]),
    JwtModule.register({
      secret: process.env.SECRET_JWT || 'THIS IS A SECRET JWT',
      signOptions: {expiresIn: '7200s'}
    })],
})
export class AuthModule {}