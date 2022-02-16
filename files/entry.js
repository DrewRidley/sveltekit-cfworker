import { App } from 'APP';
import { manifest, prerendered } from 'MANIFEST';
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

export default {
	async fetch(request, env, ctx) {
		return new Response(JSON.stringify({
			request,
			env,
			ctx
		}), 200);
	}
}