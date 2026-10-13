import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UsersModule } from '../users/users.module.js';
import { JwtModule } from "@nestjs/jwt"
import { jwtConfigAsync } from '../../config/jwt.config.js';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync(jwtConfigAsync),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule]

})
export class AuthModule { }
