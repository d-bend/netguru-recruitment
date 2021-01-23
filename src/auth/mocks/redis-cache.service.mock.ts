export class MockedRedisCacheService {
  public async get(key) {
    return 'value';
  }
  public async set(key, value) {
    'mockityMock';
  }
}
