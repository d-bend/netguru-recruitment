import { Test, TestingModule } from '@nestjs/testing';
import { MockedRedisCacheService } from '../mocks/redis-cache.service.mock';
import { RedisCacheService } from '../redis-cache/redis-cache.service';
import { BasicUserLookupService } from './basic-user-lookup.service';

describe('BasicUserLookupService', () => {
  let service: BasicUserLookupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BasicUserLookupService,
        { provide: RedisCacheService, useClass: MockedRedisCacheService },
      ],
    }).compile();

    service = module.get<BasicUserLookupService>(BasicUserLookupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
