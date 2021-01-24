import { MovieInfo } from '../types/export';

export class MockMovieInfoService {
  public async getMovieInfo(title: string): Promise<Partial<MovieInfo>> {
    return {
      title,
      director: 'MockDirector',
      genre: 'MockGenre',
      released: new Date(),
    };
  }
}
