import { Role } from './role.enum';

export interface User {
  sub: number;
  role: Role;
  userId: number;
}
