import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import moviesConfig from '../../../config/movies.config';
import { MovieInfoService } from './movie-info.service';

describe('MovieInfoService', () => {
  let service: MovieInfoService;
  const OLD_ENV = process.env;
  beforeAll(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });
  afterAll(() => {
    process.env = OLD_ENV;
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ load: [moviesConfig] }), HttpModule],
      providers: [MovieInfoService],
    }).compile();

    service = module.get<MovieInfoService>(MovieInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('getMovieInfo sets correct date', async () => {
    process.env.OMDB_API_KEY = '2c0935ff';
    const result = await service.getMovieInfo('The Godfather');
    expect(result.released).toEqual(new Date(1972, 2, 24));
  });
});
