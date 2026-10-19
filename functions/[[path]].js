/**
 * Both Cloudflare Pages projects deploy the same Dispositivos- main branch.
 * Serve files from this project's own Pages assets; never call the other domain.
 * That keeps both sites independent and prevents reciprocal proxy/redirect loops.
 */
export async function onRequest(context) {
  const {request} = context;
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Método no permitido', {status: 405});
  }
  return context.next();
}
