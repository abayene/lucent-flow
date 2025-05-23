export type LucentQueryFn = (
  args: LucentQueryArgs
) => Promise<LucentQueryResult>;

export interface LucentQueryArgs {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
  responseHandler?: 'json' | 'text' | 'blob' | 'arrayBuffer';
  validateStatus?: (status: number) => boolean;
  optimisticUpdateId?: string;
}

export interface LucentQueryResult<T = unknown> {
  data: T;
  meta: {
    request: Request;
    response: Response;
  };
}

export interface LucentQueryConfig {
  baseUrl?: string;
  prepareHeaders?: (
    headers: Headers,
    api: { getState: () => unknown }
  ) => Headers;
  fetchFn?: typeof fetch;
  timeout?: number;
  requestInterceptors?: Array<(args: LucentQueryArgs) => LucentQueryArgs | Promise<LucentQueryArgs>>;
  responseInterceptors?: Array<(result: LucentQueryResult) => LucentQueryResult | Promise<LucentQueryResult>>;
  errorInterceptors?: Array<(error: Error) => Error | Promise<Error>>;
  enableDeduplication?: boolean;
  enableOptimisticUpdates?: boolean;
  
}
