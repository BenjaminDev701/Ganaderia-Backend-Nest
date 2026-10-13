import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginUserDto {

    @IsEmail()
    email: string

    @IsString()
    @MinLength(8, { message: "La contraseña debe ser de al menos 8 caracteres " })
    password: string
}