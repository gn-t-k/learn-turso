import {
	database,
	databaseProvider,
	temporaryDatabaseConfig,
} from "@packages/database";

type WithTestDb = <T>(
	callback: (database_: typeof database) => Promise<T>,
) => Promise<T>;
export const withTestDb: WithTestDb = async (callback) => {
	return await databaseProvider(temporaryDatabaseConfig, () => {
		return callback(database);
	});
};
