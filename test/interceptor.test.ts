import { beforeAll, describe, expect, it } from 'vitest';
import { HttpRequest } from '../src/request';
import { HttpHandlerFn } from '../src/interceptor';
import { Observable } from 'rxjs/internal/Observable';
import { HttpEvent, HttpResponse } from '../src/response';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '../src/client';
import { last, lastValueFrom } from 'rxjs';

export function tokenInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const token = '7pDAGbxHSoc5rjRySY-aU5vKvRQRoP7rdNqcv8W6DKY';
  if (token) {
    const reqWithHeader = req.clone({
      headers: req.headers.set('Authorizen', token),
    });
    return next(reqWithHeader);
  }

  return next(req);
}

export function responseDataFormatInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        return event.clone({ body: event.body?.data });
      }
      return event;
    })
  );
}

const http = new HttpClient();
http.use([tokenInterceptor, responseDataFormatInterceptor]);

describe('test Http Interceptor', () => {
  it.concurrent('modify http request', async ({ expect }) => {
    const res: any = await lastValueFrom(
      http.get('http://127.0.0.1:8443/ping').pipe(
        tap((event) => {
          console.log('@@@@');
        })
      )
    );
    expect(res).toMatchInlineSnapshot('"ping success !"');
  });
  it.concurrent('format response data', async ({ expect }) => {
    const res: any = await lastValueFrom(
      http.post('http://127.0.0.1:8443/ping', { username: 'test', age: 18 })
    );
    expect(res).toMatchInlineSnapshot(`
      {
        "age": 18,
        "username": "test",
      }
    `);
  });
});
