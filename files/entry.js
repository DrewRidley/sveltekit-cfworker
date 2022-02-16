import { App } from 'APP';
import { manifest, prerendered } from 'MANIFEST';
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

const app = new App(manifest);

const prefix = `/${manifest.appDir}/`;

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);

		if (url.pathname.startsWith(prefix)) {
			return new Response(`Asset namespace: ${env.__STATIC_CONTENT}`, { status: 200 });
		}

		return new Response(`Asset namespace: ${env.__STATIC_CONTENT}`, { status: 200 });
		//return await app.render(request);
	}
}