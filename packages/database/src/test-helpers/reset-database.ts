import { createClient } from "@libsql/client";
import { dropTables } from "../utilities/drop-tables";
import { runMigrations } from "../utilities/run-migrations";
import { temporaryDatabaseConfig } from "./temporary-database-config";

type ResetDatabase = () => Promise<void>;
export const resetDatabase: ResetDatabase = async () => {
	const libsql = createClient(temporaryDatabaseConfig);

	try {
		await dropTables(libsql);
		await runMigrations(libsql);
	} catch (error) {
		throw new Error("Failed to reset database", { cause: error });
	} finally {
		libsql.close();
	}
};
