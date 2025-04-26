import type { Client } from "@libsql/client";

type GetTableNames = (libsql: Client) => Promise<string[]>;
export const getTableNames: GetTableNames = async (libsql) => {
	const tablesResult = await libsql.execute(
		"SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_litestream_%';",
	);

	const tableNames = tablesResult.rows
		.map((row) => row["name"] as string)
		.filter(Boolean);

	return tableNames;
};
