import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
/**
 * This guard checks if token is valid and sets user: User metadata on request object
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
