import { createClient } from "@libsql/client";
import { deleteTables } from "../utilities/delete-tables";
import { temporaryDatabaseConfig } from "./temporary-database-config";

type ResetTables = () => Promise<void>;
export const resetTables: ResetTables = async () => {
	const libsql = createClient(temporaryDatabaseConfig);

	try {
		await deleteTables(libsql);
	} catch (error) {
		throw new Error("Failed to reset tables", { cause: error });
	} finally {
		libsql.close();
	}
};
