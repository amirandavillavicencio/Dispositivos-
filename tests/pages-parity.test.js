import test from 'node:test';
import assert from 'node:assert/strict';
import {onRequest} from '../functions/[[path]].js';

const PUBLIC_URL = 'https://dispositivos-ciac.pages.dev';
const SOURCE_URL = 'https://ciachorarios.pages.dev';

async function withMockFetch(mock, run) {
  const original = globalThis.fetch;
  globalThis.fetch = mock;
  try { await run(); } finally { globalThis.fetch = original; }
}

for (const path of ['/', '/assets/index.js', '/assets/index.css', '/?campus=vitacura', '/recursos/material?tipo=guia']) {
  test('serve the current CIAC app on the same public URL: ' + path, async () => {
    await withMockFetch(async (url, opts) => {
      assert.equal(url, SOURCE_URL + path);
      assert.equal(opts.method, 'GET');
      assert.equal(opts.redirect, 'manual');
      assert.equal(opts.headers.get('x-datae-unified-proxy'), '1');
      return new Response('contenido ' + path, {status: 200, headers: {'content-type': 'text/html', 'set-cookie': 'secret=123'}});
    }, async () => {
      const res = await onRequest({request: new Request(PUBLIC_URL + path)});
      assert.equal(res.status, 200);
      assert.equal(await res.text(), 'contenido ' + path);
      assert.equal(res.headers.get('set-cookie'), null);
      assert.equal(res.headers.get('content-type'), 'text/html');
    });
  });
}

test('passes cache/range/accept headers, never credentials', async () => {
  const request = new Request(PUBLIC_URL + '/assets/a.js', {headers: {
    accept: 'text/javascript', range: 'bytes=0-9', 'if-none-match': 'abc',
    'accept-language': 'es-CL', cookie: 'private=1', authorization: 'Bearer secret',
  }});
  await withMockFetch(async (url, opts) => {
    assert.equal(opts.headers.get('accept'), 'text/javascript');
    assert.equal(opts.headers.get('range'), 'bytes=0-9');
    assert.equal(opts.headers.get('if-none-match'), 'abc');
    assert.equal(opts.headers.get('accept-language'), 'es-CL');
    assert.equal(opts.headers.get('cookie'), null);
    assert.equal(opts.headers.get('authorization'), null);
    return new Response('ok');
  }, async () => assert.equal((await onRequest({request})).status, 200));
});

test('HEAD returns no body, even with an upstream response', async () => {
  await withMockFetch(async (_url, opts) => {
    assert.equal(opts.method, 'HEAD');
    return new Response(null, {status: 200, headers: {'content-type': 'text/html'}});
  }, async () => {
    const result = await onRequest({request: new Request(PUBLIC_URL + '/', {method: 'HEAD'})});
    assert.equal(result.status, 200);
    assert.equal(result.body, null);
  });
});

test('rejects write methods without making upstream requests', async () => {
  await withMockFetch(async () => { throw Error('Should not call upstream'); }, async () => {
    const result = await onRequest({request: new Request(PUBLIC_URL + '/', {method: 'POST'})});
    assert.equal(result.status, 405);
  });
});

test('rewrites internal redirects to preserve the public URL', async () => {
  await withMockFetch(async () => new Response(null, {
    status: 302, headers: {location: SOURCE_URL + '/destino?x=1#contenido'},
  }), async () => {
    const result = await onRequest({request: new Request(PUBLIC_URL + '/')});
    assert.equal(result.status, 302);
    assert.equal(result.headers.get('location'), PUBLIC_URL + '/destino?x=1#contenido');
  });
});

test('does not turn a double-slash path into another upstream host', async () => {
  await withMockFetch(async (url) => {
    assert.equal(new URL(url).origin, SOURCE_URL);
    return new Response('safe');
  }, async () => {
    const result = await onRequest({request: new Request(PUBLIC_URL + '//external.example/path')});
    assert.equal(await result.text(), 'safe');
  });
});

test('returns a non-cacheable error if the application origin is unavailable', async () => {
  await withMockFetch(async () => { throw Error('network down'); }, async () => {
    const result = await onRequest({request: new Request(PUBLIC_URL + '/')});
    assert.equal(result.status, 502);
    assert.equal(result.headers.get('cache-control'), 'no-store');
  });
});
