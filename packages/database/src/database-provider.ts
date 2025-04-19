// biome-ignore lint/correctness/noNodejsModules: <explanation>
import { AsyncLocalStorage } from "node:async_hooks";
import { type Config, createClient } from "@libsql/client";
import { type LibSQLDatabase, drizzle } from "drizzle-orm/libsql";
import { schema } from "./schema";

type Database = LibSQLDatabase<typeof schema>;
const storage = new AsyncLocalStorage<Database>();

export const databaseProvider = <T>(config: Config, callback: () => T): T => {
	const libsqlClient = createClient(config);
	const database = drizzle(libsqlClient, { schema });

	return storage.run(database, callback);
};

export const getDatabase = (): Database => {
	const database = storage.getStore();
	if (!database) {
		throw new Error("Database not provided");
	}
	return database;
};
