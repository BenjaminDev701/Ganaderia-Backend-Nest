import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';

@Module({
  //*agregamos la entity al module 
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  //*exportamos por que el authmodule lo necesita para usar este servicio para que consulte en la bd el email y contraseña del usuario
  exports: [UsersService]
})
export class UsersModule { }
