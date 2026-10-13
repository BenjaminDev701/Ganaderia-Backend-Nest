import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from '../decorators/roles.decorator.js';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        //*para poder leer los roles que le ponemos a los controllers
        private readonly reflector: Reflector
    ) { }
    canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
        //* obtiene los roles con el reflector (Roles que viene del decorador)
        //* context.getHandler() obtiene el controlador
        const requiredRoles = this.reflector.get(Roles, context.getHandler());
        //*si no hay roles rotrna el true y permite el acceso sin validar el rol
        if (!requiredRoles) return true;
        //*si hay roles el request es la peticion que viene del cliente
        const request = context.switchToHttp().getRequest();
        //*user es el usuario que viene en la peticion
        const user = request.user;
        //*returna true si el rol del usuario esta incluido en los roles requeridos
        return requiredRoles.includes(user?.role);
    }
}