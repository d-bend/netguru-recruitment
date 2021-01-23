import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { lowerFirst } from 'lodash';

import { MovieInfo } from './types/export';
import { Movie, MovieDocument } from './schemas/movie.schema';

import { MovieInfoService } from './movie-info/movie-info.service';
import { UtilsService } from '../shared/utils/utils.service';
import { OmdbRelevantFields } from './movie-info/omdb-api-types';

type RelevantField = 'title' | 'released' | 'director' | 'genre';
@Injectable()
export class MoviesService {
  private relevantFields: RelevantField[] = OmdbRelevantFields.map((field) =>
    lowerFirst(field),
  );

  constructor(
    @InjectModel(Movie.name)
    private readonly moviesRepository: Model<MovieDocument>,
    private readonly movieInfoService: MovieInfoService,
    private readonly utils: UtilsService,
  ) {}

  public async createMovie(userId: any, name: string): Promise<MovieInfo> {
    const movieInfo = await this.movieInfoService.getMovieInfo(name);

    const saved = await this.saveToDB(userId, movieInfo);
    const result: MovieInfo = this.utils.filterRelevantKeys<
      RelevantField,
      MovieInfo
    >(saved, this.relevantFields);

    return result;
  }

  public async getMoviesByUser(userId: Types.ObjectId): Promise<MovieInfo[]> {
    const query = await this.moviesRepository.find({ owner: userId });
    if (!query) {
      console.log(query);
    }
    const filtered: MovieInfo[] = query.map((doc: MovieDocument) => {
      return this.utils.filterRelevantKeys<RelevantField, MovieInfo>(
        doc,
        this.relevantFields,
      );
    });

    return filtered;
  }

  private async saveToDB(
    userId: any,
    movieInfo: MovieInfo,
  ): Promise<MovieDocument> {
    const filtered = this.utils.filterRelevantKeys<RelevantField, MovieInfo>(
      movieInfo,
      this.relevantFields,
    );
    return await this.moviesRepository.updateOne(
      {
        owner: userId,
        title: movieInfo.title,
      },
      { ...filtered, owner: userId },
    );
  }
}
