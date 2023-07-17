import { 
  ForbiddenException, 
  Injectable, 
  NotFoundException, 
  UnauthorizedException
} 
from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';

import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository : Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepository : Repository<Role>,

    private readonly jwtTokenService: JwtService
  ){}

  async login(createAuthDto: CreateAuthDto){
    try{
      const { email, password } = createAuthDto;

      const queryUser = `SELECT * FROM users WHERE email = ?`;
      const [user] : User[] = await this.userRepository.query(queryUser, [email]);

      // VALIDACION QUE EXISTE EL USER EN LA BD
      if(!user) throw new NotFoundException("Usuario no existente en la BD");

      const queryRoleInnerJoinUsers = `SELECT roles.name, roles.description FROM roles INNER JOIN users ON roles.id = users.type_rol WHERE users.email = ?`;
      const [role] : Role[] = 
        await this.roleRepository.query(queryRoleInnerJoinUsers, [user.email]);

      //SI EL USUARIO EXISTE, VALIDA QUE SEA UN ADMIN
      if(role.name !== "ADMIN") throw new ForbiddenException("Debes ser un usuario administrador");

      //SI CUMPLEN AMBAS CONDICIONES, VERIFICA QUE SEA EL MISMO PASSWORD
      //ACLARATORIA, DEBE SER ENCRIPTADO AMBAS PARTES, POR FALTA DE TIEMPO NO PUEDO HACERLO :(
      if(user.password !== password) throw new UnauthorizedException("Contrasena invalida");


      const payload = { email : user.email, ID : user.identificacion_document }
      const access_token = this.jwtTokenService.sign(payload);

      return {
        message : "Login works",
        createAuthDto,
        user,
        role,
        access_token
      }
    }
    catch(error){
      console.log("Ocurrio un error :( ");
      return {
        message : "Ocurrio un error",
        error
      }
    }
  }
}
