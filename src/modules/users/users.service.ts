import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const password = createUserDto.password;
      const hashPasswordUser = await bcrypt.hash(password, 10);
      //*password sobreescribe al del dto y le coloca la contraseña ya hasheada
      const user = this.userRepository.create({ ...createUserDto, password: hashPasswordUser })
      return this.userRepository.save(user)
    } catch (error) {
      this.handleDbExceptions(error)
    }
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) throw new NotFoundException("Usuario no encontrado")
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id)
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10)
    }
    //*Object.assign: mezcla el objeto user con el objeto updateUserDto y sobreescribe los campos
    const updateUser = Object.assign(user, updateUserDto)
    return this.userRepository.save(updateUser)


  }

  async remove(id: string) {
    const user = await this.findOne(id)
    await this.userRepository.remove(user)
    return { message: "Usuario eliminado correctamente" }
  }

  private handleDbExceptions(error: any) {
    if (error.code === "23505") {
      throw new BadRequestException("El correo ya esta registrado")
    }
    else {
      throw new InternalServerErrorException("ERROR INTERNO")
    }

  }
}
