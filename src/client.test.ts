
import { HttpClient } from './client';
import { expect, test, describe, it } from 'vitest';

describe('suite', () => {
  it('serial test', async () => {
    const http = new HttpClient();
    const res: any = await http
      .post('https://www.wflixu.cn/api/passport/login', JSON.stringify({username: 'lx', password: '123'}))
      .toPromise();
    expect(res.data).not.toBe(undefined);
  });
});
