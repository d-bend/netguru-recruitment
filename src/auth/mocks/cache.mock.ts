export class MockedCache {
  public async get(key) {
    return '1';
  }
  public async set(key, value) {}
  public async reset() {}
}
