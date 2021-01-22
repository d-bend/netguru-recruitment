import { HttpModule, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MovieInfoService } from './movie-info.service';

const mockedConfigService = {
  get(key: string) {
    switch (key) {
      case 'moviesConfig.apiKey':
        return '2c0935ff';
      case 'moviesConfig.baseUrl':
        return 'http://www.omdbapi.com/';
    }
  },
};

describe('MovieInfoService', () => {
  let service: MovieInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        MovieInfoService,
        { provide: ConfigService, useValue: mockedConfigService },
      ],
    }).compile();

    service = module.get<MovieInfoService>(MovieInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('getMovieInfo sets correct date', async () => {
    const result = await service.getMovieInfo('The Godfather');
    expect(result.released).toEqual(new Date(1972, 2, 24));
  });
  it('getMovieInfo throws 404 on invalid movie title', async () => {
    const expectedToThrow = async () => {
      return await service.getMovieInfo('Im not real');
    };
    expect(expectedToThrow()).rejects.toThrowError(NotFoundException);
  });
});
