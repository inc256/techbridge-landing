// src/lib/api/client.ts
export const API_BASE = "https://techbridge-backend-rust.vercel.app/api/v1";

export interface ApiClientOptions {
  headers?: Record<string, string>;
  signal?: AbortSignal;
  timeoutMs?: number;
}

export async function apiClient<T>(path: string, options: ApiClientOptions = {}): Promise<T> {
  const url = `${API_BASE.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 8000);

  if (options.signal) {
    options.signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`API error ${response.status}: ${text || response.statusText}`);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    console.error(`API request failed for ${url}:`, error);
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
