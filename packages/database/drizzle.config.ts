import type { Config } from "drizzle-kit";
import invariant from "tiny-invariant";

const tursoDatabaseUrl = process.env["TURSO_DATABASE_URL"];
invariant(tursoDatabaseUrl, "環境変数`TURSO_DATABASE_URL`が設定されていません");

const tursoAuthToken = process.env["TURSO_AUTH_TOKEN"];

export default {
	schema: "./src/tables",
	out: "./migrations",
	dialect: "turso",
	dbCredentials: {
		url: tursoDatabaseUrl,
		...([undefined, ""].includes(tursoAuthToken)
			? { token: tursoAuthToken }
			: {}),
	},
} satisfies Config;
