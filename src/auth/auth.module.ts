import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { BasicUserLookupService } from './basic-user-lookup/basic-user-lookup.service';
import { BasicUserGuard } from './basic-user.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get('jwtConfig.jwtSecret'),
      }),
      inject: [ConfigService],
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
