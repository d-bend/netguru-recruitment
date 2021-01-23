import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { BasicUserLookupService } from './basic-user-lookup/basic-user-lookup.service';
import { BasicUserGuard } from './basic-user.guard';
import { JwtConfig, RedisConfig } from 'config/enums';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get(JwtConfig.JWT_SECRET),
      }),
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        store: redisStore,
        host: config.get(RedisConfig.host),
        port: config.get(RedisConfig.port),
      }),
    }),
    ConfigModule,
  ],
  providers: [
    JwtStrategy,
    JwtAuthGuard,
    BasicUserLookupService,
    BasicUserGuard,
  ],
  exports: [BasicUserLookupService],
})
export class AuthModule {}
