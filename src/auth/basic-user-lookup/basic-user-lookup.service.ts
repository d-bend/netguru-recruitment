import { Injectable, Logger } from '@nestjs/common';
import { RedisCacheService } from '../redis-cache/redis-cache.service';

@Injectable()
export class BasicUserLookupService {
  private readonly logger = new Logger(BasicUserLookupService.name, true);

  constructor(private readonly redisCache: RedisCacheService) {}

  public async checkLimit(sub): Promise<boolean> {
    const result = await this.redisCache.get(sub);

    if (!result) {
      this.redisCache.set(sub, 1);
      this.logger.debug(
        `User not found in cache, User sub: ${sub}, request count: ${1}, 4 left this month`,
      );
      return true;
    }
    const parsed = parseInt(result);

    if (parsed < 5) {
      this.redisCache.set(sub, parsed + 1);
      this.logger.debug(
        `User sub: ${sub} so far made ${parsed} requests this month, ${
          5 - (parsed + 1)
        } left.`,
      );
      return true;
    } else {
      this.logger.debug(
        `User sub: ${sub} cannot make more requests this month`,
      );
      return false;
    }
  }
}
