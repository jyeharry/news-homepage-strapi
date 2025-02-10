import qs from "qs";

interface Props {
  endpoint: string;
  query?: Record<string, unknown>;
}

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param query - The query parameters to add to the url
 * @returns
 */
export default async function fetchApi<T>({
  endpoint,
  query,
}: Props): Promise<T> {
  if (endpoint.startsWith('/')) {
    endpoint = endpoint.slice(1);
  }

  const url = new URL(`${import.meta.env.STRAPI_URL}/api/${endpoint}`);

  if (query) {
    const q = qs.stringify(query)
    url.search = q
  }
  const res = await fetch(url.toString());
  const data = await res.json();

  return data.data as T
}
