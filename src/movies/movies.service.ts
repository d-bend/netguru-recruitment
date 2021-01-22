import { Injectable, NotImplementedException } from '@nestjs/common';
import { Movie } from './schemas/movie.schema';

@Injectable()
export class MoviesService {
  public async createMovie(uid: any, name: string): Promise<Movie> {
    throw new NotImplementedException();
  }
  public async getMoviesByUser(uid: any): Promise<Movie[]> {
    throw new NotImplementedException();
  }
}
