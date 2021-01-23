import { HttpService, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { cloneDeep } from 'lodash';

import { MovieInfo } from '../types/export';
import { MoviesConfig } from '../../../config/enums';
import {
  OmdbApiNullResponse,
  OmdbApiField,
  OmdbRelevantFields,
} from './omdb-api-types';

import { UtilsService } from '../../shared/utils/utils.service';

@Injectable()
export class MovieInfoService {
  private baseUrl = this.config.get(MoviesConfig.baseUrl);
  private apiKey = this.config.get(MoviesConfig.apiKey);

  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
    private readonly utils: UtilsService,
  ) {}

  /** Get movie info from OMDB API
   * Throws NotFoundException on invalid movie title
   * @param title space separated movie title
   */
  public async getMovieInfo(title: string): Promise<MovieInfo> {
    const parsedTitle = this.titleParser(title);
    const url = `${this.baseUrl}?t=${parsedTitle}&apikey=${this.apiKey}`;

    const apiResponse = await this.httpService.get(url).toPromise();

    if (apiResponse.data.Response === OmdbApiNullResponse.false) {
      throw new NotFoundException(apiResponse.data.Error);
    }
    const filtered = this.utils.filterRelevantKeys<OmdbApiField>(
      apiResponse.data,
      OmdbRelevantFields,
    );
    return this.convertReleasedToDate(filtered);
  }

  private titleParser(title: string): string {
    return title.trim().split(' ').join('+');
  }

  private convertReleasedToDate(movieInfo: any): MovieInfo {
    //movieInfo has to be any because one of the fields has a wrong type at this point

    const cloned = cloneDeep(movieInfo);
    return { ...cloned, released: new Date(cloned.released) };
  }
}
