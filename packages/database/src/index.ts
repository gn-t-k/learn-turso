import { AsyncLocalStorage } from "node:async_hooks";
import { type Config, createClient } from "@libsql/client";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import { drizzle } from "drizzle-orm/libsql";
import { schema } from "./schema";

export * from "drizzle-orm";

export * from "./schema";

type Database = LibSQLDatabase<typeof schema>;
const storage = new AsyncLocalStorage<Database>();

export const databaseProvider = <T>(config: Config, callback: () => T): T => {
	const client = createClient(config);
	return storage.run(drizzle(client, { schema }), callback);
};

export const getDatabase = (): Database => {
	const database = storage.getStore();
	if (!database) {
		throw new Error("Database not provided");
	}
	return database;
};
