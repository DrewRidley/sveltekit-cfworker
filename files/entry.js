import { App } from 'APP';
import { manifest, prerendered } from 'MANIFEST';
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

const app = new App(manifest);

const prefix = `/${manifest.appDir}/`;

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);

		if(url.pathname.startsWith(prefix)) {
			try {
				const res = await getAssetFromKV(
					{
					  request,
					  waitUntil(promise) {
						return ctx.waitUntil(promise)
					  },
					},
					{
					  ASSET_NAMESPACE: env.__STATIC_CONTENT,
					  ASSET_MANIFEST: manifest,
					},
				  );

				  return new Response(res.body, {
					  headers: {
						'cache-control': 'public, immutable, max-age=31536000',
						'content-type': res.headers.get('content-type')
					  }
				  });
			}
			catch (ex) {
				if (e instanceof NotFoundError) {
				  // ...
				} else if (e instanceof MethodNotAllowedError) {
				  // ...
				} else {
				  return new Response('An unexpected error occurred', { status: 500 })
				}
			  }

			try {
				return await app.render(request);
			}
			catch (ex) {
				return new Response('Error rendering route:' + (e.message || e.toString()), { status: 500 });
			}
		}
	}
}