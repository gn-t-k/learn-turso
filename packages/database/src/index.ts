import { AsyncLocalStorage } from "node:async_hooks";
import type { Client } from "@libsql/client";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import { drizzle } from "drizzle-orm/libsql";
import { schema } from "./schema";

export * from "drizzle-orm";

export { createClient } from "@libsql/client";

export * from "./schema";

type Database = LibSQLDatabase<typeof schema>;
const storage = new AsyncLocalStorage<Database>();

export const databaseProvider = <T>(client: Client, callback: () => T): T => {
	return storage.run(drizzle(client, { schema }), callback);
};

export const getDatabase = (): Database => {
	const database = storage.getStore();
	if (!database) {
		throw new Error("Database not provided");
	}
	return database;
};
