import { Test, TestingModule } from '@nestjs/testing';
import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilsService],
    }).compile();

    service = module.get<UtilsService>(UtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('filterRelevantKeys', () => {
    it('filters object with all lowercase keys', () => {
      interface ImportantInterface {
        important: string;
      }
      type Important = 'important';
      const relevantFields: Important[] = ['important'];
      const unfiltered = {
        bla: 'asd',
        asd: 'asd',
        fas: 'asd',
        agsdgsa: 'asd',
        important: 'got it!',
      };

      const result = service.filterRelevantKeys<Important, ImportantInterface>(
        unfiltered,
        relevantFields,
      );

      expect(result).toBeDefined();
      expect(result.important).toBeDefined();
      expect(result.important).toBe('got it!');
      expect(result['bla']).toBeUndefined();
    });
    it('filters object with fields starting with uppercase', () => {
      interface ImportantInterface {
        important: string;
      }
      type Important = 'Important' | 'Other';
      const relevantFields: Important[] = ['Important', 'Other'];
      const unfiltered = {
        bla: 'asd',
        asd: 'asd',
        fas: 'asd',
        agsdgsa: 'asd',
        Important: 'got it!',
        Other: 'still got it!',
      };

      const result = service.filterRelevantKeys<Important, ImportantInterface>(
        unfiltered,
        relevantFields,
      );
      expect(result).toBeDefined();
      expect(result.important).toBeDefined();
      expect(result.important).toBe('got it!');
      expect(result['bla']).toBeUndefined();
      expect(result).toEqual({ important: 'got it!', other: 'still got it!' });
    });
    it('converts PascalCase to camelCase', () => {
      interface ImportantInterface {
        importantField: string;
      }
      type Important = 'ImportantField';
      const relevantFields: Important[] = ['ImportantField'];
      const unfiltered = {
        bla: 'asd',
        asd: 'asd',
        fas: 'asd',
        agsdgsa: 'asd',
        ImportantField: 'got it!',
      };

      const result = service.filterRelevantKeys<Important, ImportantInterface>(
        unfiltered,
        relevantFields,
      );
      expect(result).toBeDefined();
      expect(result.importantField).toBeDefined();
      expect(result.importantField).toBe('got it!');
      expect(result['bla']).toBeUndefined();
    });
  });
});
