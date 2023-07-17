import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: +process.env.PORT,
      database: process.env.DATABASE_NAME,
      username: process.env.USERNAME_DB,
      password: process.env.PASSWORD_DB,  
      retryDelay: 3000,    
      autoLoadEntities: true,
      synchronize: false, //Ya la estructura SQL esta hecha, solo usaremos el orm para interacciones
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
