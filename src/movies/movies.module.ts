import { HttpModule, Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesDatabaseModule } from '../database/movies.database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './schemas/movie.schema';
import { MovieInfoService } from './movie-info/movie-info.service';

@Module({
  imports: [
    HttpModule,
    MoviesDatabaseModule,
    MongooseModule.forFeature(
      [{ name: Movie.name, schema: MovieSchema }],
      'MoviesDb',
    ),
  ],
  providers: [MoviesService, MovieInfoService],
  exports: [MoviesService],
})
export class MoviesModule {}
