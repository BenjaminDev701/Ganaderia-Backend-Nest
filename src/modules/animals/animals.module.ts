import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service.js';
import { AnimalsController } from './animals.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Animal])],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule { }
