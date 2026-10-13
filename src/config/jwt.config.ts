//ConfigService es el servicio de NestJS encargado de leer las variables de entorno de forma centralizada y segura.
import { ConfigService } from '@nestjs/config';
//* JwtModuleAsyncOptions: es una interface que permite configurar el jwt de forma asincrona
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfigAsync: JwtModuleAsyncOptions = {
    //*inject contiene los servicios que usara useFactory
    inject: [ConfigService],
    //*useFactory recibe de argumento inyectado 
    useFactory: (configService: ConfigService) => ({
        //*obtiene la clave secreta para firmar el token que esta en tu .env
        secret: configService.get('JWT_SECRET') || 'MiClaveSuperSecretaDeDesarrollo',
        //*duracion del token
        signOptions: { expiresIn: '1d' },
    }),
};
