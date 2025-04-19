import type { Config } from "@libsql/client";

export const temporaryDatabaseConfig = {
	url: "file:./temp.db",
} satisfies Config;
