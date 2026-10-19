import test from 'node:test';
import assert from 'node:assert/strict';
import {onRequest} from '../functions/[[path]].js';

for (const domain of ['ciachorarios.pages.dev','dispositivos-ciac.pages.dev']) {
  for (const path of ['/', '/assets/index.js', '/assets/index.css', '/?campus=vitacura']) {
    test(`serve local assets without proxying: ${domain}${path}`, async () => {
      const url = new URL(path, `https://${domain}`);
      const request = new Request(url);
      const local = new Response('mismo contenido', {status: 200, headers: {'content-type':'text/html'}});
      let nextCalls = 0;
      const response = await onRequest({request, next: async () => {nextCalls++;return local;}});
      assert.strictEqual(response,local,'Preserves the Pages assets response unchanged');
      assert.equal(nextCalls,1,'Must not fetch the other site or redirect');
      assert.equal(response.status,200);
      assert.equal(response.headers.get('location'),null);
    });
  }
}

test('GET and HEAD use local asset handling; non-read methods remain forbidden',async()=>{
  let calls=0;
  const next=async()=>{calls++;return new Response(null,{status:204})};
  const head=await onRequest({request:new Request('https://dispositivos-ciac.pages.dev/',{method:'HEAD'}),next});
  assert.equal(head.status,204);
  const post=await onRequest({request:new Request('https://ciachorarios.pages.dev/',{method:'POST'}),next});
  assert.equal(post.status,405);
  assert.equal(calls,1);
});
