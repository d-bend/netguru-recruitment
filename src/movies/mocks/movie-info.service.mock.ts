import { MovieInfoService } from '../movie-info/movie-info.service';
import { MovieInfo } from '../types/export';

export class MockMovieInfoService {
  public async getMovieInfo(title: string): Promise<MovieInfo> {
    return {
      title,
      director: 'MockDirector',
      genre: 'MockGenre',
      released: new Date(),
    };
  }
}
