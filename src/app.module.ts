import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import moviesConfig from '../config/movies.config';
import jwtConfig from '../config/jwt.config';
import redisConfig from '../config/redis.config';

import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { MoviesController } from './controllers/movies.controller';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [moviesConfig, jwtConfig, redisConfig],
      isGlobal: true,
    }),
    MoviesModule,
    AuthModule,
    SharedModule,
  ],
  controllers: [AppController, MoviesController],
  providers: [AppService],
})
export class AppModule {}
