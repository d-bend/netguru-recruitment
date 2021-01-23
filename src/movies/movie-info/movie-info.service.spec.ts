import { HttpModule, HttpService, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from '../../shared/shared.module';
import { MoviesConfig } from '../../../config/enums';
import { MovieInfoService } from './movie-info.service';
import { of } from 'rxjs';

const mockedConfigService = {
  get(key: string) {
    switch (key) {
      case MoviesConfig.apiKey:
        return 'apikey';
      case MoviesConfig.baseUrl:
        return 'http://www.omdbapi.com/';
    }
  },
};

class MockedHttpService {
  public get(url: string) {
    if (url.includes('Im+not+real')) {
      return of({
        data: {
          Response: 'False',
        },
      });
    } else if (url.includes('this+was+not+spaced')) {
      return of({
        data: {
          Response: 'False',
        },
      });
    } else {
      return of({
        data: {
          Title: 'MockTitle',
          Genre: 'MockGenre',
          Director: 'MockDirector',
          Released: '24 Mar 1972',
          Other: 'NOOOO!',
        },
      });
    }
  }
}

describe('MovieInfoService', () => {
  let service: MovieInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, SharedModule],
      providers: [
        MovieInfoService,
        { provide: ConfigService, useValue: mockedConfigService },
        { provide: HttpService, useClass: MockedHttpService },
      ],
    }).compile();

    service = module.get<MovieInfoService>(MovieInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getMovieInfo', () => {
    it('sets fields correctly', async () => {
      const result = await service.getMovieInfo('The Goodfellas');

      expect(result).toBeDefined();
      expect(result.director).toBe('MockDirector');
      expect(result.title).toBe('MockTitle');
      expect(result.genre).toBe('MockGenre');
      expect(result.released).toBeDefined();
    });
    it('should set correct date', async () => {
      const result = await service.getMovieInfo('The Godfather');

      expect(result.released).toEqual(new Date(1972, 2, 24));
    });

    it('throws 404 on unexisting movie', async () => {
      const expectedToThrow = async () => {
        return await service.getMovieInfo('Im not real');
      };

      expect(expectedToThrow()).rejects.toThrowError(NotFoundException);
    });
    it('throws error on title that wasnt space-separated', async () => {
      const expectedToThrow = async () => {
        return await service.getMovieInfo('this+was+not+spaced');
      };

      expect(expectedToThrow()).rejects.toThrowError(NotFoundException);
    });
    it('doesnt return irrelevant fields', async () => {
      const result = await service.getMovieInfo('Pulp Fiction');

      expect(result['Other']).toBeUndefined();
    });
  });
});
