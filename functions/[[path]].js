// dispositivos-ciac.pages.dev shows the current DATA-E/CIAC application
// without redirecting visitors or duplicating its source in this repository.
// ciac-vitacura (published at ciachorarios.pages.dev) remains the source of truth.
const APP_ORIGIN = 'https://ciachorarios.pages.dev';
const FORWARDED_HEADERS = ['accept', 'accept-language', 'range', 'if-none-match', 'if-modified-since'];

export async function onRequest({request}) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Método no permitido', {status: 405});
  }

  const source = new URL(request.url);
  const target = new URL(APP_ORIGIN);
  // Assign path/search separately: a path starting with // must not change the host.
  target.pathname = source.pathname;
  target.search = source.search;

  const forwarded = new Headers();
  for (const name of FORWARDED_HEADERS) {
    const value = request.headers.get(name);
    if (value) forwarded.set(name, value);
  }
  // Keep the origin clearly identifiable if its routing ever changes.
  forwarded.set('x-datae-unified-proxy', '1');

  let response;
  try {
    response = await fetch(target.toString(), {
      method: request.method,
      headers: forwarded,
      redirect: 'manual',
    });
  } catch {
    return new Response('La aplicación CIAC no está disponible temporalmente.', {
      status: 502,
      headers: {'cache-control': 'no-store'},
    });
  }

  const headers = new Headers(response.headers);
  headers.delete('set-cookie');
  if (response.status >= 300 && response.status < 400) {
    const location = headers.get('location');
    if (location) {
      const destination = new URL(location, APP_ORIGIN);
      if (destination.origin === APP_ORIGIN) {
        headers.set('location', source.origin + destination.pathname + destination.search + destination.hash);
      }
    }
  }

  return new Response(request.method === 'HEAD' ? null : response.body, {
    status: response.status,
    headers,
  });
}
