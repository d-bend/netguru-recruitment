import { Injectable } from '@nestjs/common';

@Injectable()
export class BasicUserLookupService {
  public async checkLimit(userId: number): Promise<boolean> {
    //TODO
    return false;
  }
}
