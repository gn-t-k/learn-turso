import { createClient } from "@libsql/client";
import { getTableNames } from "./get-table-names";
import { temporaryDatabaseConfig } from "./temporary-database-config";

type DropTables = () => Promise<void>;
export const dropTables: DropTables = async () => {
	const database = createClient(temporaryDatabaseConfig);

	const tableNames = await getTableNames();

	if (tableNames.length === 0) {
		return;
	}

	await database.migrate(
		tableNames.map((tableName) => `DROP TABLE IF EXISTS "${tableName}";`),
	);
};
