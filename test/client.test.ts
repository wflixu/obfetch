import { lastValueFrom } from 'rxjs';
import { HttpClient } from '../src/client';
import { expect, test, describe, it } from 'vitest';
const http = new HttpClient({
  baseURL: 'http://127.0.0.1:8443',
});
describe('suite httclient', () => {
  it('serial test get', async () => {
    const res: any = await lastValueFrom(http.get('/ping'));
    expect(res.data).toMatchInlineSnapshot('"ping success !"');
  });
  it('serial test post', async () => {
    const res: any = await lastValueFrom(
      http.post('/ping', { username: 'test', age: 18 })
    );
    expect(res.data).toMatchInlineSnapshot(`
      {
        "age": 18,
        "username": "test",
      }
    `);
  });
});
