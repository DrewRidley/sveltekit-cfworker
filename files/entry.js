import { App } from 'APP';
import { manifest, prerendered } from 'MANIFEST';
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

const app = new App(manifest);

const prefix = `/${manifest.appDir}/`;

addEventListener('fetch', (/** @type {FetchEvent} */ event) => {
	event.respondWith(handle(event));
});

export default {
	async fetch(request, env, ctx) {
		return new Response(JSON.stringify({
			request,
			env,
			ctx
		}), 200);
	}
}