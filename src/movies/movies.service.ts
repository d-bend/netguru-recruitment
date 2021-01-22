import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { MovieInfo } from './types/export';

import { MovieInfoService } from './movie-info/movie-info.service';
import { Movie, MovieDocument } from './schemas/movie.schema';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name)
    private readonly moviesRepository: Model<MovieDocument>,
    private readonly movieInfoService: MovieInfoService,
  ) {}
  public async createMovie(uid: any, name: string): Promise<MovieInfo> {
    const movieInfo = await this.movieInfoService.getMovieInfo(name);

    const { title, genre, director, released } = await this.saveToDB(
      uid,
      movieInfo,
    );

    return { title, genre, director, released };
  }
  public async getMoviesByUser(uid: Types.ObjectId): Promise<MovieInfo[]> {
    const query = await this.moviesRepository.find({ owner: uid });
    if (!query) {
      console.log(query);
    }

    const filtered: MovieInfo[] = query.map(
      ({ title, genre, director, released }) => ({
        title,
        genre,
        director,
        released,
      }),
    );

    return filtered;
  }
  private async saveToDB(
    uid: any,
    { title, genre, director, released }: MovieInfo,
  ): Promise<MovieDocument> {
    return await this.moviesRepository.updateOne(
      {
        owner: uid,
        title,
      },
      { owner: uid, title, genre, director, released },
    );
  }
}
