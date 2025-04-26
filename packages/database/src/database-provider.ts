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

const target = {} as never;
export const database = new Proxy<Database>(target, {
	get: (_target, prop: keyof Database) => {
		const instance = storage.getStore();
		if (!instance) {
			throw new Error("Database not provided");
		}
		const value = instance[prop];
		if (typeof value === "function") {
			value.bind(instance);
		}
		return value;
	},
});
