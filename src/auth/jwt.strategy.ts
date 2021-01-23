import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JwtTokenPayload } from './jwtTokenPayload.interface';
import { JwtConfig } from 'config/enums';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get(JwtConfig.JWT_SECRET),
    });
  }

  async validate({ sub, role }: JwtTokenPayload) {
    return { userId: sub, role };
  }
}
