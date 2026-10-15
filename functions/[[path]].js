// Mantiene dispositivos-ciac.pages.dev como dirección pública de la aplicación
// unificada. La única fuente de código y horarios sigue en ciac-vitacura.
const APP_ORIGIN = 'https://ciachorarios.pages.dev'

export async function onRequest({ request }) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Método no permitido', { status: 405 })
  }

  const source = new URL(request.url)
  const target = new URL(source.pathname + source.search, APP_ORIGIN)
  const headers = new Headers()

  // Se transmiten únicamente encabezados necesarios para servir recursos estáticos.
  for (const name of ['accept', 'accept-language', 'range', 'if-none-match', 'if-modified-since']) {
    const value = request.headers.get(name)
    if (value) headers.set(name, value)
  }

  // Permite servir recursos desde el proyecto de origen sin activar su redirección pública.\n  headers.set('x-datae-unified-proxy', '1')\n\n  const response = await fetch(target, { method: request.method, headers, redirect: 'manual' })

  // No copiar cookies del dominio de origen al dominio público.
  const responseHeaders = new Headers(response.headers)
  responseHeaders.delete('set-cookie')

  // Mantener a los estudiantes dentro de la dirección oficial si el origen redirige.
  if (response.status >= 300 && response.status < 400) {
    const location = responseHeaders.get('location')
    if (location) {
      const destination = new URL(location, APP_ORIGIN)
      if (destination.origin === APP_ORIGIN) {
        responseHeaders.set('location', source.origin + destination.pathname + destination.search + destination.hash)
      }
    }
  }

  return new Response(request.method === 'HEAD' ? null : response.body, {
    status: response.status,
    headers: responseHeaders,
  })
}
