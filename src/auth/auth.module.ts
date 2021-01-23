import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { BasicUserLookupService } from './basic-user-lookup/basic-user-lookup.service';
import { BasicUserGuard } from './basic-user.guard';
import { JwtConfig } from 'config/enums';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { RedisCacheService } from './redis-cache/redis-cache.service';

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
    ConfigModule,
    RedisCacheModule,
  ],
  providers: [
    JwtStrategy,
    JwtAuthGuard,
    BasicUserLookupService,
    BasicUserGuard,
  ],
  exports: [BasicUserLookupService, RedisCacheModule],
})
export class AuthModule {}
