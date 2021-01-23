import { Injectable } from '@nestjs/common';
import { RedisCacheService } from '../redis-cache/redis-cache.service';

@Injectable()
export class BasicUserLookupService {
  constructor(private readonly redisCache: RedisCacheService) {}

  public async checkLimit(sub): Promise<boolean> {
    const result = await this.redisCache.get(sub);

    if (!result) {
      this.redisCache.set(sub, 1);
      return true;
    }
    const parsed = parseInt(result);

    if (parsed < 5) {
      this.redisCache.set(sub, result + 1);
      return true;
    } else {
      return false;
    }
  }
}
