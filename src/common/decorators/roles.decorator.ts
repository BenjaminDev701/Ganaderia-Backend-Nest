import { Reflector } from "@nestjs/core";
import { Role } from "../../modules/users/entities/role.enum.js";

//* Sirve para la hora de usar los RolesDecorator en los controladores tengamos acceso a los roles ya establecidos
//*reflector es para capturar los roles
export const Roles = Reflector.createDecorator<Role[]>();