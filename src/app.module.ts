import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './modules/users/users.module.js';

@Module({
    imports: [
        // 1. Carga el .env en process.env
        ConfigModule.forRoot(),

        // 2. Usas process.env directamente (con '+' para convertir el puerto a número)
        TypeOrmModule.forRoot({
            //*typo de base de datos
            type: 'postgres',
            //*host de la base de datos
            host: process.env.DB_HOST ?? 'localhost',
            //*puerto de la base de datos
            port: +(process.env.DB_PORT ?? 5432),
            //*nombre de la base de datos
            database: process.env.POSTGRES_DB,
            //*usuario de la base de datos
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            //* cargara las entidades automaticamente
            autoLoadEntities: true,
            //*sincroniza la base de datos con las entidades
            synchronize: true,
        }),

        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
