import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JwtTokenPayload } from './types/jwtTokenPayload.interface';
import { JwtConfig } from 'config/enums';
import { User } from './types/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get(JwtConfig.JWT_SECRET),
    });
  }
  /**
   * set user: User on request,
   *  at this point we are sure that the token was valid
   */
  async validate({ userId, sub, role }: JwtTokenPayload): Promise<User> {
    return { userId, sub, role };
  }
}
