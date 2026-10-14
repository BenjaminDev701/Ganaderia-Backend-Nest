import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto.js';
import { UpdateAnimalDto } from './dto/update-animal.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity.js';
import { Repository } from 'typeorm';


@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private readonly animalsRepository: Repository<Animal>
  ) { }
  async create(createAnimalDto: CreateAnimalDto) {
    try {
      const animal = this.animalsRepository.create(createAnimalDto)
      await this.animalsRepository.save(animal)
      return { message: "Animal creado exitosamente" }
    } catch (error) {
      this.handleDbExeptions(error)
    }
  }

  async findAll() {
    const animals = await this.animalsRepository.find()
    return animals
  }

  async findOne(id: string) {
    const animal = await this.animalsRepository.findOneBy({ id })
    if (!animal) throw new NotFoundException("El animal no ha sido encontrado")
    return animal
  }

  async update(id: string, updateAnimalDto: UpdateAnimalDto) {
    const animal = await this.findOne(id)
    try {
      const animalUpdate = Object.assign(animal, updateAnimalDto)
      await this.animalsRepository.save(animalUpdate)
      return { message: "El animal fue actualizado satisfactoriamente" }
    } catch (error) {
      this.handleDbExeptions(error)
    }
  }

  async remove(id: string) {
    await this.findOne(id)
    await this.animalsRepository.delete(id)
    return { message: "Animal eliminado exitosamente" }
  }

  private handleDbExeptions(error: any) {
    if (error.code === "23505") {
      throw new BadRequestException("El animal ya existe")
    }
    throw new InternalServerErrorException("Error interno en la base de datos")
  }
}
