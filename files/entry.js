import { App } from 'APP';
import { manifest, prerendered } from 'MANIFEST';
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

const app = new App(manifest);

const prefix = `/${manifest.appDir}/`;

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);

		if (url.pathname.startsWith(prefix)) {
			const res = await getAssetFromKV(
				{
					request,
					waitUntil(promise) {
						return ctx.waitUntil(promise);
					},	
				},
				{
					ASSET_NAMESPACE: env.__STATIC_CONTENT,
					ASSET_MANIFEST: manifest,
				}
			);

			return res;
		}
		return new Response(`Prefix Match: ${prefix} \n Url Pathname: ${url.pathname}`, { status: 200 });
		//return await app.render(request);
	}
}