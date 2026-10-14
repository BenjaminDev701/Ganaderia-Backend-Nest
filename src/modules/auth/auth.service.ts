import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginUserDto } from "./dto/login-user.dto.js";
import { UsersService } from "../users/users.service.js";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt"



@Injectable()
export class AuthService {
  constructor(
    //*Sirve para usar el metodo de encontrar por email
    private readonly usersService: UsersService,
    //*Sirve para usar el metodo de generar token y viene por parte de la libreria nestjs/jwt
    //*y esto proviene de JwtModule que esta en auth.module
    private readonly jwtService: JwtService
  ) { }

  async login(loginUserDto: LoginUserDto) {
    //*Busca al user con el email enviado por el usuario para el login
    const user = await this.usersService.findByEmail(loginUserDto.email)
    if (!user) throw new UnauthorizedException("Credenciales Invalidas")
    //*compara la funcion de bcrypt de la contraseña que envio el usuario en login con la que se guardo en la bd y se compara con la funcion
    const passwordIsValid = await bcrypt.compare(loginUserDto.password, user.password)
    if (!passwordIsValid) throw new UnauthorizedException("Credenciales Invalidas")
    //todo: payload es la informacion que se va a guardar en el token
    const payload = { id: user.id, role: user.role }
    return {
      //*es el token firmado con la informacion del usuario
      access_token: this.jwtService.sign(payload)
    }

  }

}
