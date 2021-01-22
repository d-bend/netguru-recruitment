import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import moviesConfig from '../config/movies.config';

import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { MoviesController } from './controllers/movies.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [moviesConfig],
      isGlobal: true,
    }),
    MoviesModule,
  ],
  controllers: [AppController, MoviesController],
  providers: [AppService],
})
export class AppModule {}
