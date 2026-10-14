import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, } from "class-validator"

export class CreateAnimalDto {

    @IsString()
    @IsNotEmpty()
    tag_number: string

    @IsString()
    @IsNotEmpty()
    @IsEnum(["Equino", "Bovino", "Porcino"])
    species: string

    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    breed: string

    @IsString()
    @IsNotEmpty()
    @IsEnum(["Macho", "Hembra"])
    gender: string

    @IsNumber()
    @IsOptional()
    weight_kg: number

    @IsDateString()
    @IsOptional()
    birth_date: Date

    @IsString()
    status: string
}
