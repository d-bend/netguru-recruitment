export class MockedCache {
  public async get(key) {
    return 'value';
  }
  public async set(key, value) {}
  public async reset() {}
}
