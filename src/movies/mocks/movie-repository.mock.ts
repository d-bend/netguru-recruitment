import { Movie } from '../schemas/movie.schema';

export class MockMovieRepository {
  /**
   * This mock sets 'other' field on the return object
   * @param queryParams whatever you supply here will be present on response
   */
  public async find({ owner, title }: Partial<Movie>) {
    const mockTitle = title ? title : 'MockTitle';
    const result = {
      _doc: {
        owner,
        title: mockTitle,
        director: 'MockDirector',
        genre: 'MockGenre',
        released: new Date(),
        other: 'other unwanted data from query',
      },
    };

    return [{ ...result }, { ...result }, { ...result }, { ...result }];
  }
  /**
   *  This mock sets 'other' field on the return object
   * @param dummyQuery throw-away data
   * @param documentToSave new document to be saved or overwritten
   * @param dummyOptions throw-away data
   */
  public async findOneAndUpdate(
    dummyQuery: Partial<Movie>,
    { owner, title, genre, director, released }: Movie,
    dummyOptions: any,
  ) {
    return {
      _doc: {
        owner,
        title,
        genre,
        director,
        released,
        other: 'other unwanted data',
      },
    };
  }
}
