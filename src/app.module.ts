import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import moviesConfig from '../config/movies.config';
import jwtConfig from '../config/jwt.config';

import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { MoviesController } from './controllers/movies.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [moviesConfig, jwtConfig],
      isGlobal: true,
    }),
    MoviesModule,
    AuthModule,
  ],
  controllers: [AppController, MoviesController],
  providers: [AppService],
})
export class AppModule {}
