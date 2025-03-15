import { databaseProvider } from "@packages/database";
import { Hono } from "hono";
import { createRequestHandler } from "react-router";
import invariant from "tiny-invariant";

const tursoDatabaseUrl = process.env["TURSO_DATABASE_URL"];
invariant(
	tursoDatabaseUrl,
	"環境変数`TURSO_DATABASE_URL`が設定されていません。",
);

const tursoAuthToken = process.env["TURSO_AUTH_TOKEN"];

const app = new Hono();

app.use((_c, next) => {
	return databaseProvider(
		{
			url: tursoDatabaseUrl,
			...(tursoAuthToken !== undefined ? { authToken: tursoAuthToken } : {}),
		},
		next,
	);
});

app.use(async (c) => {
	// @ts-expect-error - virtual module provided by React Router at build time
	const build = await import("virtual:react-router/server-build");
	const handler = createRequestHandler(build, import.meta.env.MODE);
	const result = await handler(c.req.raw);
	return result;
});

export default app;
