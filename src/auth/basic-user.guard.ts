import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { BasicUserLookupService } from './basic-user-lookup/basic-user-lookup.service';
import { Role } from './role.enum';

@Injectable()
export class BasicUserGuard implements CanActivate {
  constructor(private readonly basicUserLookup: BasicUserLookupService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { userId, role } = context.switchToHttp().getRequest();

    if (role === Role.PREMIUM) {
      return true;
    } else if (role === Role.BASIC) {
      return await this.basicUserLookup.checkLimit(userId);
    } else {
      return false;
    }
  }
}
