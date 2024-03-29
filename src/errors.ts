/**
 * The list of error codes used in runtime code of the `common/http` package.
 * Reserved error code range: 2800-2899.
 */
export const enum RuntimeErrorCode {
  MISSING_JSONP_MODULE = -2800,
  NOT_USING_FETCH_BACKEND_IN_SSR = 2801,
  HEADERS_ALTERED_BY_TRANSFER_CACHE = 2802,
}
