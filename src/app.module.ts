import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

@Module({
    imports: [
        // 1. Carga el .env en process.env
        ConfigModule.forRoot(),

        // 2. Usas process.env directamente (con '+' para convertir el puerto a número)
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST ?? 'localhost',
            port: +(process.env.DB_PORT ?? 5432),
            database: process.env.POSTGRES_DB,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            autoLoadEntities: true,
            synchronize: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
