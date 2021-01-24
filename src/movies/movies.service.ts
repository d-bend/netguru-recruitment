import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Model } from 'mongoose';
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
  private readonly logger = new Logger(MoviesService.name, true);
  private relevantFields: RelevantField[] = OmdbRelevantFields.map((field) =>
    lowerFirst(field),
  );

  constructor(
    @InjectModel(Movie.name)
    private readonly moviesModel: Model<MovieDocument>,
    private readonly movieInfoService: MovieInfoService,
    private readonly utils: UtilsService,
  ) {}

  /**
   *  This method fetches info about the movie from a service
   *  You could swap MovieInfoService for a diferent implementation without any more modifications
   * @param userId get it from request.user.userId
   * @param title space separated movie title
   */
  public async createMovie(userId: number, title: string): Promise<any> {
    const movieInfo = await this.movieInfoService.getMovieInfo(title);

    this.logger.debug(
      `Fetched movie info: ${movieInfo}`,
      this.createMovie.name,
    );
    const saved = await this.saveToDB(userId, movieInfo).catch((err) => {
      this.logger.error('Failed to save to DB', err, this.createMovie.name);
      throw new InternalServerErrorException();
    });
    const result: MovieInfo = this.utils.filterRelevantKeys<
      RelevantField,
      MovieInfo
    >(saved, this.relevantFields);

    return result;
  }

  /**
   * Get all movies belonging to an user
   * @param userId get it from request.user.userId
   */
  public async getMoviesByUser(userId: number): Promise<MovieInfo[]> {
    const query = await this.moviesModel
      .find({ owner: userId })
      .catch((err) => {
        this.logger.error(
          `Bad response from DB`,
          err,
          this.getMoviesByUser.name,
        );
        throw new InternalServerErrorException();
      });

    const filtered: MovieInfo[] = query.map((doc: MovieDocument) => {
      let sanitized = {};
      for (const key in doc) {
        if (key === '_doc') {
          sanitized = doc[key];
        }
      }
      return this.utils.filterRelevantKeys<RelevantField, MovieInfo>(
        sanitized,
        this.relevantFields,
      );
    });
    return filtered;
  }

  /** This method can take in any movie information and save only the info that is relevant to the user! */
  private async saveToDB(
    userId: number,
    movieInfo: MovieInfo,
  ): Promise<MovieDocument> {
    const filtered = this.utils.filterRelevantKeys<RelevantField, MovieInfo>(
      movieInfo,
      this.relevantFields,
    );
    return await this.moviesModel.findOneAndUpdate(
      { owner: userId, title: filtered.title },
      { ...filtered, owner: userId },
      { upsert: true, new: true },
    );
  }
}
