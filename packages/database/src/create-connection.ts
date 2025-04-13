import { type Config, createClient } from "@libsql/client";
import { type LibSQLDatabase, drizzle } from "drizzle-orm/libsql";
import { schema } from "./schema";

type CreateConnection = (config: Config) => LibSQLDatabase<typeof schema>;
export const createConnection: CreateConnection = (config) => {
	const client = createClient(config);
	return drizzle(client, { schema });
};
