// src/lib/api/client.ts
export const API_BASE = "https://techbridge-backend-rust.vercel.app/";

export interface ApiClientOptions {
  headers?: Record<string, string>;
}

export async function apiClient<T>(path: string, options: ApiClientOptions = {}): Promise<T> {
  const url = `${API_BASE.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`API error ${response.status}: ${text || response.statusText}`);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    console.error(`API request failed for ${url}:`, error);
    throw error;
  }
}
