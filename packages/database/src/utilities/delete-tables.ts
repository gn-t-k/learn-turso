import type { Client } from "@libsql/client";
import { getTableNames } from "./get-table-names";

type DeleteTables = (libsql: Client) => Promise<void>;
export const deleteTables: DeleteTables = async (libsql) => {
	const tableNames = await getTableNames(libsql);

	if (tableNames.length === 0) {
		return;
	}

	await libsql.migrate(
		tableNames.map((tableName) => `DELETE FROM "${tableName}";`),
	);
};
