import { HttpService, Injectable, NotFoundException } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';

import { MovieInfo } from '../types/export';

@Injectable()
export class MovieInfoService {
  private baseUrl: string;
  private relevantFields: string[] = ['Title', 'Released', 'Director', 'Genre'];
  private apiKey: string;

  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.baseUrl = this.config.get('moviesConfig.baseUrl');
    this.apiKey = this.config.get('moviesConfig.apiKey');
  }
  /** Get movie info from OMDB API
   * Throws NotFoundException on invalid movie title
   * @param title space separated movie title
   */
  public async getMovieInfo(title: string): Promise<MovieInfo> {
    const parsedTitle = this.titleParser(title);
    const apiResponse = await this.httpService
      .get(`${this.baseUrl}?t=${parsedTitle}&apikey=${this.apiKey}`)
      .toPromise();

    if (apiResponse.data.Response === 'False') {
      throw new NotFoundException(apiResponse.data.Error);
    }

    const filtered = this.filterKeys(apiResponse);
    return this.convertReleasedToDate(filtered);
  }

  private titleParser(title: string): string {
    return title.trim().split(' ').join('+');
  }

  private filterKeys({ data }: AxiosResponse) {
    return Object.keys(data)
      .filter((key) => this.relevantFields.includes(key))
      .reduce((obj, key) => {
        obj[key.toLowerCase()] = data[key];
        return obj;
      }, {});
  }

  private convertReleasedToDate(movieInfo: any): MovieInfo {
    return { ...movieInfo, released: new Date(movieInfo.released) };
  }
}
