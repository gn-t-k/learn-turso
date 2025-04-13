import type { Config } from "@libsql/client";

const fileName = "temp.db";

export const temporaryDatabaseConfig = {
	url: `file:./${fileName}`,
} satisfies Config;
