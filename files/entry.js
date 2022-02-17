import { App } from 'APP';
import { manifest, prerendered } from 'MANIFEST';
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

const app = new App(manifest);

const prefix = `/${manifest.appDir}/`;

export default {
	async fetch(request, env, ctx) {

		return new Response(`Static Content: ${env.__STATIC_CONTENT}`, { status: 200 })

		const url = new URL(request.url);

		if (url.pathname.startsWith(prefix) || manifest.assets.has(url.pathname.replace('/', ''))) {
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

		const pathname = url.pathname.replace(/\/$/, '');
		let file = pathname.substring(1);

		try {
			file = decodeURIComponent(file);
		}
		catch (err) {
			//ignore
		}

		if (
			manifest.assets.has(file) ||
			manifest.assets.has(file + '/index.html') ||
			prerendered.has(pathname || '/')
		) {
			return await getAssetFromKV(
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
		}

		try {
			return await app.render(request);
		}
		catch (ex) {
			return new Response('Error rendering route:' + (e.message || e.toString()), { status: 500 });
		}


	}
}