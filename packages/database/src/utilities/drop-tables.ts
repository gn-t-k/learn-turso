import type { Client } from "@libsql/client";
import { getTableNames } from "./get-table-names";

type DropTables = (libsql: Client) => Promise<void>;
export const dropTables: DropTables = async (libsql) => {
	const tableNames = await getTableNames(libsql);

	if (tableNames.length === 0) {
		return;
	}

	await libsql.migrate(
		tableNames.map((tableName) => `DROP TABLE IF EXISTS "${tableName}";`),
	);
};
