import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import {
  AvailableApiFields,
  MovieInfo,
  RelevantField,
  AllRelevantFields,
  TaskSpecRelevantFields,
} from './types/export';
import { Movie, MovieDocument } from './schemas/movie.schema';

import { MovieInfoService } from './movie-info/movie-info.service';
import { UtilsService } from '../shared/utils/utils.service';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name, true);

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
  public async createMovie(
    userId: number,
    title: string,
    relevantFields?: Partial<AvailableApiFields>,
  ): Promise<any> {
    const fieldsToGet = this.setFieldsToGet(relevantFields);

    const movieInfo = await this.movieInfoService.getMovieInfo(
      title,
      fieldsToGet,
    );

    this.logger.debug(
      `Fetched movie info: ${{ ...movieInfo }}`,
      this.createMovie.name,
    );
    const saved = await this.saveToDB(userId, movieInfo, fieldsToGet).catch(
      (err) => {
        this.logger.error('Failed to save to DB', err, this.createMovie.name);
        throw new InternalServerErrorException();
      },
    );
    const sanitized = this.sanitizeMongooseDocument(saved);
    const result: Partial<MovieInfo> = this.utils.filterRelevantKeys<
      RelevantField,
      Partial<MovieInfo>
    >(sanitized, fieldsToGet);

    return result;
  }

  /**
   * Get all movies belonging to an user
   * @param userId get it from request.user.userId
   */
  public async getMoviesByUser(userId: number): Promise<Partial<MovieInfo>[]> {
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
      const sanitized = this.sanitizeMongooseDocument(doc);

      return this.utils.filterRelevantKeys<RelevantField, Partial<MovieInfo>>(
        sanitized,
        AllRelevantFields,
      );
    });

    return filtered;
  }

  /** This method can take in any movie information and save only the info that is relevant to the user! */
  private async saveToDB(
    userId: number,
    movieInfo: Partial<MovieInfo>,
    fieldsToGet: RelevantField[],
  ): Promise<MovieDocument> {
    const filtered = this.utils.filterRelevantKeys<
      RelevantField,
      Partial<MovieInfo>
    >(movieInfo, fieldsToGet);
    return await this.moviesModel.findOneAndUpdate(
      { owner: userId, title: filtered.title },
      { ...filtered, owner: userId },
      { upsert: true, new: true },
    );
  }

  /** This is a workaround a bug when passing a mongoose doc into utils.filterRelevantKeys
   * @param doc: Mongoose document to sanitize
   * @returns Sanitized document comprehensible to utils.filterRelevantKeys
   */
  private sanitizeMongooseDocument(doc: Document) {
    let sanitized = {};
    for (const key in doc) {
      if (key === '_doc') {
        sanitized = doc[key];
      }
    }
    return sanitized;
  }

  /**
   * Call this method on optional argument to get a mask for filtering API response
   * @param relevantFields optional arg passed in by user
   * @returns Prepared mask or default mask
   */
  private setFieldsToGet(relevantFields?: Partial<AvailableApiFields>) {
    return relevantFields
      ? this.prepareFieldsToGet(relevantFields)
      : TaskSpecRelevantFields;
  }

  /**
   * Converts options param passed in by user to a mask
   * Only call this from setFieldsToGet
   * Converts document like: {
   *  title: true,
   *  director: true,
   * }
   * to
   * ['title', 'director']
   * @param relevantFields
   */
  private prepareFieldsToGet(
    relevantFields: Partial<AvailableApiFields>,
  ): RelevantField[] {
    const result: RelevantField[] = [];
    for (const key in relevantFields) {
      if (relevantFields[key]) {
        result.push(key as RelevantField);
      }
    }
    return result;
  }
}
