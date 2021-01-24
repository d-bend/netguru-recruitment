import {
  HttpService,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { cloneDeep, upperFirst } from 'lodash';

import { MovieInfo, RelevantField } from '../types/export';
import { MoviesConfig } from '../../../config/enums';
import { OmdbApiNullResponse, OmdbApiField } from './omdb-api-types';

import { UtilsService } from '../../shared/utils/utils.service';

@Injectable()
export class MovieInfoService {
  private readonly logger = new Logger(MovieInfoService.name, true);
  private readonly baseUrl = this.config.get(MoviesConfig.baseUrl);
  private readonly apiKey = this.config.get(MoviesConfig.apiKey);

  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
    private readonly utils: UtilsService,
  ) {}

  /** Get movie info from OMDB API
   * Throws NotFoundException on invalid movie title
   * @param title space separated movie title
   */
  public async getMovieInfo(
    title: string,
    relevantFields: RelevantField[],
  ): Promise<Partial<MovieInfo>> {
    const parsedTitle = this.titleParser(title);
    const url = `${this.baseUrl}?t=${parsedTitle}&apikey=${this.apiKey}`;

    this.logger.debug(`Sending GET request to ${url}`, this.getMovieInfo.name);

    const apiResponse = await this.httpService.get(url).toPromise();

    if (apiResponse.data.Response === OmdbApiNullResponse.false) {
      this.logger.log(
        `Cannot find movie: ${title} requested by user`,
        this.getMovieInfo.name,
      );
      throw new NotFoundException(apiResponse.data.Error);
    }

    const filterMask = this.convertRelevantFields(relevantFields);
    const filtered = this.utils.filterRelevantKeys<
      OmdbApiField,
      Partial<MovieInfo>
    >(apiResponse.data, filterMask);

    return this.convertReleasedToDate(filtered);
  }

  private titleParser(title: string): string {
    return title.trim().split(' ').join('+');
  }

  private convertReleasedToDate(movieInfo: any): MovieInfo {
    //movieInfo has to be any because one of the fields has a wrong type at this point

    const cloned = cloneDeep(movieInfo);
    if (cloned.released) {
      return { ...cloned, released: new Date(cloned.released) };
    } else {
      return { ...cloned };
    }
  }

  private convertRelevantFields(
    relevantFields: RelevantField[],
  ): OmdbApiField[] {
    return relevantFields.map((field) => upperFirst(field));
  }
}
