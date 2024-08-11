import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';


import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [User, Post],
        synchronize: true, // Nota: Establecer en false para producción
    
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    AuthModule,
    PostsModule,
    UsersModule,
   
  ],
})
export class AppModule {}