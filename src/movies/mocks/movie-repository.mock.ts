import { Movie } from '../schemas/movie.schema';

export class MockMovieRepository {
  public async find({ owner }: Partial<Movie>) {
    const result = {
      owner,
      title: 'MockTitle',
      director: 'MockDirector',
      genre: 'MockGenre',
      released: new Date(),
      other: 'other unwanted data from query',
    };
    return [result, result, result, result];
  }
  public async updateOne(
    _: Partial<Movie>,
    { owner, title, genre, director, released }: Movie,
  ) {
    return {
      owner,
      title,
      genre,
      director,
      released,
      other: 'other unwanted data',
    };
  }
}
