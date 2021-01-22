import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MovieInfoService } from './movie-info/movie-info.service';
import { Types } from 'mongoose';

import { MoviesService } from './movies.service';
import { Movie } from './schemas/movie.schema';

import { MockMovieInfoService, MockMovieRepository } from './mocks/export';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getModelToken(Movie.name),
          useClass: MockMovieRepository,
        },
        { provide: MovieInfoService, useClass: MockMovieInfoService },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getMoviesByUser', () => {
    let exampleUID;
    beforeEach(() => {
      exampleUID = Types.ObjectId();
    });

    it('only returns essential fields', async () => {
      const result: any[] = await service.getMoviesByUser(exampleUID);

      result.forEach((el) => {
        expect(el).toBeDefined();
        expect(el.director).toBeDefined();
        expect(el.genre).toBeDefined();
        expect(el.released).toBeDefined();
        expect(el.title).toBeDefined();
        expect(el.other).toBeUndefined();
        expect(el.owner).toBeUndefined();
      });
    });
  });
  describe('createMovie', () => {
    const mockDirector = 'MockDirector';
    const mockGenre = 'MockGenre';

    let exampleUID;
    let exampleTitle;
    beforeEach(() => {
      exampleUID = Types.ObjectId();
      exampleTitle = 'exampleTitle';
    });

    it('only returns essential fields', async () => {
      const result: any = await service.createMovie(exampleUID, exampleTitle);
      expect(result.title).toEqual(exampleTitle);
      expect(result.director).toEqual(mockDirector);
      expect(result.genre).toEqual(mockGenre);
      expect(result.released).toBeDefined();
      expect(result.owner).toBeUndefined();
      expect(result.other).toBeUndefined();
    });
  });
});
