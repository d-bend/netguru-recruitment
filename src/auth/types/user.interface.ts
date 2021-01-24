import { Role } from './role.enum';

/**
 * metadata set on request.user by JWTGuard
 */
export interface User {
  sub: number;
  role: Role;
  userId: number;
}
