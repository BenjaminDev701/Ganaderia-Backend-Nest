import { IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator"
import { Role } from "../entities/role.enum.js"
import { Transform } from "class-transformer"

export class CreateUserDto {

    @IsString({ message: "El nombre debe ser texto" })
    @MinLength(3, { message: "Debe de ser de al menos 3 caracteres" })
    @MaxLength(30, { message: "Debe de ser de al menos 30 caracteres" })
    name: string

    @IsEmail()
    @Transform(({ value }) => value.toLowerCase())
    email: string

    @IsString()
    @MinLength(8, { message: "La contraseña debe de ser de almenos 8 caracteres" })
    @MaxLength(50, { message: "Debe de ser de al menos 50 caracteres" })
    password: string

    @IsEnum(Role, { message: "El rol debe ser (Trabajador, Veterinario)" })
    @IsOptional()
    role?: Role
}
