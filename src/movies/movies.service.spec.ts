import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MovieInfoService } from './movie-info/movie-info.service';
import { Types } from 'mongoose';

import { MoviesService } from './movies.service';
import { Movie } from './schemas/movie.schema';

import { MockMovieInfoService, MockMovieRepository } from './mocks/export';
import { MovieInfo } from './types/export';
import { SharedModule } from '../shared/shared.module';

describe('MoviesService', () => {
  let service: MoviesService;
  let exampleUID;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [
        MoviesService,
        SharedModule,
        {
          provide: getModelToken(Movie.name),
          useClass: MockMovieRepository,
        },
        { provide: MovieInfoService, useClass: MockMovieInfoService },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);

    exampleUID = 12342;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMoviesByUser', () => {
    it('should only returns essential fields', async () => {
      const result: MovieInfo[] = await service.getMoviesByUser(exampleUID);

      result.forEach((el) => {
        expect(el).toBeDefined();
        expect(el.director).toBeDefined();
        expect(el.genre).toBeDefined();
        expect(el.released).toBeDefined();
        expect(el.title).toBeDefined();
        expect(el['other']).toBeUndefined();
        expect(el['owner']).toBeUndefined();
      });
    });
  });

  describe('createMovie', () => {
    it('only returns essential fields', async () => {
      const mockDirector = 'MockDirector';
      const mockGenre = 'MockGenre';
      const exampleTitle = 'MockTitle';

      const result: MovieInfo = await service.createMovie(
        exampleUID,
        exampleTitle,
      );
      console.log(result);
      expect(result.title).toEqual(exampleTitle);
      expect(result.director).toEqual(mockDirector);
      expect(result.genre).toEqual(mockGenre);
      expect(result.released).toBeDefined();
      expect(result['other']).toBeUndefined();
      expect(result['owner']).toBeUndefined();
    });
  });
});
