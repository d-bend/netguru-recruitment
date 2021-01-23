import { HttpModule, Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesDatabaseModule } from '../database/movies.database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './schemas/movie.schema';
import { MovieInfoService } from './movie-info/movie-info.service';
import { SharedModule } from 'src/shared/shared.module';
import { MoviesConnectionName } from 'src/database/connection-name.enum';

@Module({
  imports: [
    SharedModule,
    HttpModule,
    MoviesDatabaseModule,
    MongooseModule.forFeature(
      [{ name: Movie.name, schema: MovieSchema }],
      MoviesConnectionName.moviesDb,
    ),
  ],
  providers: [MoviesService, MovieInfoService],
  exports: [MoviesService],
})
export class MoviesModule {}
