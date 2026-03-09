const BASE_URL = "https://dummyjson.com";

interface FetchOptions {
  method?: string;
  body?: unknown;
  params?: Record<string, string>;
}

/** Server-side fetch wrapper for the DummyJSON API. */
export async function dummyjsonFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { method = "GET", body, params } = options;

  let url = `${BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    throw new Error(`DummyJSON API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
