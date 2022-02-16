import { App } from 'APP';
import { manifest, prerendered } from 'MANIFEST';
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

const app = new App(manifest);

const prefix = `/${manifest.appDir}/`;

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);

		return new Response('Success rendering route!', { status: 500 });

	}
}