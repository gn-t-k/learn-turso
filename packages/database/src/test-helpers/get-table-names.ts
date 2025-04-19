import { createClient } from "@libsql/client";
import { temporaryDatabaseConfig } from "./temporary-database-config";

type GetTableNames = () => Promise<string[]>;
export const getTableNames: GetTableNames = async () => {
	const database = createClient(temporaryDatabaseConfig);

	const tablesResult = await database.execute(
		"SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_litestream_%';",
	);

	const tableNames = tablesResult.rows
		.map((row) => row["name"] as string)
		.filter(Boolean);

	return tableNames;
};
