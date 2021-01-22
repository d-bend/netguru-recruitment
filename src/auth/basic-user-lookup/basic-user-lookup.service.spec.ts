import { Test, TestingModule } from '@nestjs/testing';
import { BasicUserLookupService } from './basic-user-lookup.service';

describe('BasicUserLookupService', () => {
  let service: BasicUserLookupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasicUserLookupService],
    }).compile();

    service = module.get<BasicUserLookupService>(BasicUserLookupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
