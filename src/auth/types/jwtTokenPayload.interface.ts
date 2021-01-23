import { Role } from './role.enum';

export interface JwtTokenPayload {
  userId: number;
  name: string;
  role: Role;
  iat: number;
  exp: number;
  iss: 'https://www.netguru.com/';
  sub: number;
}
