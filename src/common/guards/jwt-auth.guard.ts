
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
//*define un Guardián (Guard) de autenticación personalizado.
//*Sirve para proteger tus rutas / endpoints asegurando que solo usuarios con un token JWT válido puedan acceder a ellos.
export class JwtAuthGuard extends AuthGuard('jwt') { }
