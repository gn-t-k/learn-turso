import { createConnection } from "../create-connection";
import { temporaryDatabaseConfig } from "./temporary-database-config";

type DropTables = () => Promise<void>;
export const dropTables: DropTables = async () => {
	const database = createConnection(temporaryDatabaseConfig);

	try {
		const tablesResult = await database.run(
			"SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_litestream_%';",
		);

		const tableNames = tablesResult.rows
			.map((row) => row["name"] as string)
			.filter(Boolean);

		if (tableNames.length === 0) {
			return;
		}

		await Promise.all(
			tableNames.map((tableName) =>
				database.run(`DROP TABLE IF EXISTS "${tableName}";`),
			),
		);
	} catch (error) {
		throw new Error("Failed to drop tables:", { cause: error });
	}
};
