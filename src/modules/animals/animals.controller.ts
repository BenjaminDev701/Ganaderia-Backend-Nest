import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { AnimalsService } from './animals.service.js';
import { CreateAnimalDto } from './dto/create-animal.dto.js';
import { UpdateAnimalDto } from './dto/update-animal.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { Role } from '../users/entities/role.enum.js';


@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) { }

  @Roles([Role.ADMIN, Role.VETERINARIO])
  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalsService.create(createAnimalDto);
  }

  @Roles([Role.ADMIN, Role.VETERINARIO, Role.TRABAJADOR])
  @Get()
  findAll() {
    return this.animalsService.findAll();
  }

  @Roles([Role.ADMIN, Role.VETERINARIO, Role.TRABAJADOR])
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.animalsService.findOne(id);
  }
  @Roles([Role.ADMIN, Role.VETERINARIO])
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animalsService.update(id, updateAnimalDto);
  }

  @Roles([Role.ADMIN])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalsService.remove(id);
  }
}
