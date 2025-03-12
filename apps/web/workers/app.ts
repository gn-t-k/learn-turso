import { createClient, databaseProvider } from "@packages/database";
import { Hono } from "hono";
import { createRequestHandler } from "react-router";

// biome-ignore lint/style/useNamingConvention: hono
// biome-ignore lint/correctness/noUndeclaredVariables: <worker-configuration.d.ts
const app = new Hono<{ Bindings: Env }>();

app.use((c, next) => {
	const databaseClient = createClient({
		url: c.env.TURSO_DATABASE_URL,
		authToken: c.env.TURSO_AUTH_TOKEN,
	});
	return databaseProvider(databaseClient, next);
});

app.use(async (c) => {
	// @ts-expect-error - virtual module provided by React Router at build time
	const build = await import("virtual:react-router/server-build");
	const handler = createRequestHandler(build, import.meta.env.MODE);
	const result = await handler(c.req.raw);
	return result;
});

export default app;
