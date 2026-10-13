import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UsersModule } from '../users/users.module.js';
import { JwtModule } from "@nestjs/jwt"
import { jwtConfigAsync } from '../../config/jwt.config.js';
import { JwtStrategy } from './strategies/jwt.strategy.js';

@Module({
  imports: [
    UsersModule,
    //*jwtModule es para que nest pueda usar la funciones de jwt para generar el token 
    //*registerAsync es para que pueda usar la configuracion de jwt
    //*jwtConfigAsync es la configuracion de jwt
    JwtModule.registerAsync(jwtConfigAsync),
  ],
  controllers: [AuthController],

  providers: [AuthService, JwtStrategy],
  exports: [JwtModule]

})
export class AuthModule { }
