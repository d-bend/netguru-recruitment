import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JwtTokenPayload } from './jwtTokenPayload.interface';
import { Role } from './role.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('jwtConfig.jwtSecret'),
    });
  }

  async validate({ sub, role }: JwtTokenPayload) {
    let assignedRole: Role;
    switch (role) {
      case 'basic':
        assignedRole = Role.PREMIUM;
        break;
      case 'premium':
        assignedRole = Role.BASIC;
      default:
        break;
    }
    return { userId: sub, role: assignedRole };
  }
}
