import adapter from "@hono/vite-dev-server/cloudflare";
import { reactRouter } from "@react-router/dev/vite";
import { cloudflareDevProxy } from "@react-router/dev/vite/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import serverAdapter from "hono-react-router-adapter/vite";
import { defineConfig } from "vite";

const entry = "./workers/app.ts";

export default defineConfig(({ isSsrBuild }) => ({
	build: {
		...(isSsrBuild
			? {
					rollupOptions: {
						input: entry,
					},
				}
			: {}),
	},
	ssr: {
		resolve: {
			conditions: ["workerd", "worker", "browser"],
			externalConditions: ["workerd", "worker"],
		},
	},
	resolve: {
		mainFields: ["browser", "module", "main"],
	},
	plugins: [
		cloudflareDevProxy({
			getLoadContext({ context }) {
				return { cloudflare: context.cloudflare };
			},
		}),
		tailwindcss(),
		reactRouter(),
		serverAdapter({
			adapter,
			entry,
		}),
	],
}));
