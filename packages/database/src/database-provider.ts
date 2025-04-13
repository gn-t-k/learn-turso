// biome-ignore lint/correctness/noNodejsModules: <explanation>
import { AsyncLocalStorage } from "node:async_hooks";
import type { Config } from "@libsql/client";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import { createConnection } from "./create-connection";
import type { schema } from "./schema";

type Database = LibSQLDatabase<typeof schema>;
const storage = new AsyncLocalStorage<Database>();

export const databaseProvider = <T>(config: Config, callback: () => T): T => {
	const connection = createConnection(config);

	return storage.run(connection, callback);
};

export const getDatabase = (): Database => {
	const database = storage.getStore();
	if (!database) {
		throw new Error("Database not provided");
	}
	return database;
};
