import { Injectable, Inject, CACHE_MANAGER, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class RedisCacheService {
  private readonly logger = new Logger(RedisCacheService.name, true);
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  public async get(key): Promise<string> {
    return await this.cache.get(key);
  }

  public async set(key, value) {
    await this.cache.set(key, value);
  }
  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT, {
    timeZone: 'Europe/Warsaw',
  })
  public async reset() {
    this.logger.log('Cache cleared!');
    await this.cache.reset();
  }
}
