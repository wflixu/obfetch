# obfetch
An http client based on rxjs and fetch API inspired by Angular HttpClient.

# use

## install

```shell
#npm
npm install obfetch

#pnpm
npm add obfetch

```
## example 

### basic


```
// http.ts/js
import  { HttpClient } from 'obfetch';
epxort  const http = new HttpClient();

// business.ts
import {http} from 'http'

http.get('http://127.0.0.1:8443/ping').subscribe(data => {
    console.log(data);
})
http.post('http://127.0.0.1:8443/ping', {username:'youname'}).subscribe(data => {
    console.log(data);
})

```


### Interceptors

obfetch supports a form of middleware known as interceptors, you can use interceptor config request or format response data。


```
// Defining an interceptor modifying request
export function tokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  let token = getTokenSomeWhere();
  if(token) {
     const reqWithHeader = req.clone({
          headers: req.headers.set('Authorizen', token),
     });
     return next(reqWithHeader);
  }
 
  return next(req);
}

// Defining an interceptor formatting response data

export function responseDataFormatInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
           return event.clone({ body: event.body?.data });
        }
         return event;
      }),
    );
}

// Use interceptor
http.use([tokenInterceptor,responseDataFormatInterceptor])

//

```


# Developing 

## local build

```
pnpm install

pnpm build

```

## unit test

```
pnpm vitest run

pnpm coerage
```






