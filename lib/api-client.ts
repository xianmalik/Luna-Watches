interface ApiClientOptions {
  method?: string;
  body?: unknown;
  params?: Record<string, string>;
}

/** Frontend fetch wrapper that calls our internal Next.js API routes. */
export async function apiClient<T>(
  endpoint: string,
  options: ApiClientOptions = {}
): Promise<T> {
  const { method = "GET", body, params } = options;

  let url = `/api${endpoint}`;
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
    const error = await res.json().catch(() => ({}));
    throw new Error(
      (error as { error?: string }).error ??
        `API error: ${res.status} ${res.statusText}`
    );
  }

  return res.json() as Promise<T>;
}
