// src/config/jwt.config.ts
import { ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfigAsync: JwtModuleAsyncOptions = {
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET') || 'MiClaveSuperSecretaDeDesarrollo',
        signOptions: { expiresIn: '1d' },
    }),
};
