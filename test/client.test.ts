import { lastValueFrom } from 'rxjs';
import { HttpClient } from '../src/client';
import { expect, test, describe, it, beforeAll, afterAll } from 'vitest';

import { closeServer, startServer } from './mock-server.mjs';

const http = new HttpClient({
  baseURL: 'http://127.0.0.1:3303',
});

beforeAll(async () => {
  await startServer();
});

afterAll(async () => {
  await closeServer();
});

describe('suite httclient', () => {
  it('serial test get', async () => {
    const res: any = await lastValueFrom(http.get('/ping'));
    expect(res).toMatchInlineSnapshot(`
      {
        "pong": "hello world !",
      }
    `);
  });
  it('serial test post', async () => {
    const res: any = await lastValueFrom(
      http.post('/ping', { username: 'test', age: 18 })
    );
    expect(res).toMatchInlineSnapshot(`
      {
        "age": 18,
        "username": "test",
      }
    `);
  });
});
