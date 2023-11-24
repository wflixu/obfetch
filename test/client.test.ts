
import { HttpClient } from '../src/client';
import { expect, test, describe, it } from 'vitest';

describe('suite httclient', () => {
  it('serial test get', async () => {
    const http = new HttpClient();
    const res: any = await http
      .get('http://127.0.0.1:8443/ping',)
      .toPromise();
    expect(res.data).toMatchInlineSnapshot('"ping success !"');
  });
  it('serial test post', async () => {
    const http = new HttpClient();
    const res: any = await http
      .post('http://127.0.0.1:8443/ping',{username: 'test',age: 18})
      .toPromise();
    expect(res.data).toMatchInlineSnapshot(`
      {
        "age": 18,
        "username": "test",
      }
    `);
  });
});
