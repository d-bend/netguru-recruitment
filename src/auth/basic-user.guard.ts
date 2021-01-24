import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { BasicUserLookupService } from './basic-user-lookup/basic-user-lookup.service';
import { Role } from './types/role.enum';

@Injectable()
export class BasicUserGuard implements CanActivate {
  private readonly logger = new Logger(BasicUserGuard.name, true);
  constructor(private readonly basicUserLookup: BasicUserLookupService) {}

  /**
   * This guards restricts users to only make 5 requests per month.
   */
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const {
      user: { sub, role },
    } = context.switchToHttp().getRequest();
    this.logger.debug({ sub, role }, this.canActivate.name);
    if (role === Role.PREMIUM) {
      return true;
    } else if (role === Role.BASIC) {
      return await this.basicUserLookup.checkLimit(sub);
    } else {
      return false;
    }
  }
}
