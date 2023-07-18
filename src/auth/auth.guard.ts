import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request);
    const token = this.extractTokenFromHeader(request);
    console.log(token);
    if (!token) throw new UnauthorizedException("No existe un token en tu peticion HTTP");
    
    try {
      await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.SECRET_JWT,
          ignoreExpiration : false
        }
      );
    } catch {
      throw new UnauthorizedException("Token invalido");
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}