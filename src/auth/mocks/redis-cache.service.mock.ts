export class MockedRedisCacheService {
  public async get(key) {
    return '1';
  }
  public async set(key, value) {
    'mockityMock';
  }
}
